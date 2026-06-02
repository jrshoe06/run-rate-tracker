/**
 * Forecast Engine
 *
 * Pure, deterministic, side-effect-free functions for computing immigration
 * case demand vs. capacity forecasts for the Google account.
 *
 * Algorithm overview:
 * 1. Determine eligible resources for a case type (Primary/Secondary capability, active, within date range)
 * 2. Compute total monthly capacity from eligible resources
 * 3. Subtract current workload burden from capacity
 * 4. Spread scenario demand evenly across forecast months
 * 5. Month-by-month: compare demand + carried backlog vs available capacity
 * 6. Track backlog creation, carry-forward, and drain
 * 7. Compute risk thresholds, clearance month, and FTE gap
 */

import {
  ResourceCapacity,
  SkillMapping,
  ProductivityWeight,
  CurrentWorkloadItem,
  DemandScenario,
  Assumptions,
  MonthlyForecastPoint,
  ForecastResult,
  RiskStatus,
  BaselineData,
  CaseType,
} from '@/types';
import { addMonths, monthsBetween, generateMonthRange, getDaysInMonth } from '@/lib/utils';

export function getEligibleResources(
  caseType: CaseType,
  caseSubtype: string | undefined,
  resources: ResourceCapacity[],
  skillMappings: SkillMapping[],
  asOfDate: string,
  includeTrainee = false
): ResourceCapacity[] {
  const eligibleIds = new Set(
    skillMappings
      .filter(sm => {
        if (sm.caseType !== caseType) return false;
        if (caseSubtype && sm.caseSubtype && sm.caseSubtype !== caseSubtype) return false;
        if (sm.capabilityLevel === 'NotEligible') return false;
        if (!includeTrainee && sm.capabilityLevel === 'Trainee') return false;
        if (sm.effectiveStartDate > asOfDate) return false;
        if (sm.effectiveEndDate && sm.effectiveEndDate < asOfDate) return false;
        return true;
      })
      .map(sm => sm.resourceId)
  );
  return resources.filter(r => r.isActive && eligibleIds.has(r.resourceId));
}

export function computeMonthlyCapacity(
  month: string,
  eligibleResources: ResourceCapacity[],
  assumptions: Assumptions
): number {
  return eligibleResources.reduce((total, resource) => {
    if (!assumptions.includeAttorneyCapacity && resource.role === 'Attorney') return total;
    const daysInMonth = getDaysInMonth(month);
    const unavailableDaysInMonth = resource.unavailableDates.filter(d => d.startsWith(month)).length;
    const availabilityFactor = Math.max(0, (daysInMonth - unavailableDaysInMonth)) / daysInMonth;
    return total + resource.monthlyCapacityPoints * availabilityFactor;
  }, 0);
}

export function computeCurrentWorkloadBurden(
  month: string,
  workload: CurrentWorkloadItem[],
  weights: ProductivityWeight[],
  assumptions: Assumptions
): number {
  return workload.reduce((total, item) => {
    if (item.isFiled) return total;
    if (assumptions.excludeOnHoldCases && item.isOnHold) return total;
    if (assumptions.excludeNonActionableCases && !item.isActionable) return total;
    if (item.openedDate.substring(0, 7) > month) return total;
    if (item.targetFileDate.substring(0, 7) < month) return total;
    const weight = weights.find(w => w.caseType === item.caseType);
    return total + (weight ? weight.paralegalWeight : item.currentProductivityWeight);
  }, 0);
}

export function computeDemandBurden(
  scenario: DemandScenario,
  weights: ProductivityWeight[]
): Map<string, number> {
  const weight = weights.find(w => w.caseType === scenario.caseType);
  const effectiveWeight = scenario.productivityWeightOverride ?? (weight ? weight.paralegalWeight : 5);
  const months = monthsBetween(scenario.projectedStartMonth, scenario.targetCompletionMonth) + 1;
  const totalPoints = scenario.projectedVolume * effectiveWeight;
  const pointsPerMonth = totalPoints / months;
  const result = new Map<string, number>();
  for (let i = 0; i < months; i++) {
    const m = addMonths(scenario.projectedStartMonth, i);
    result.set(m, pointsPerMonth);
  }
  return result;
}

export function runForecast(
  scenario: DemandScenario,
  baseline: BaselineData,
  assumptions: Assumptions
): ForecastResult {
  const { resources, skillMappings, productivityWeights, currentWorkload } = baseline;
  const startMonth = scenario.projectedStartMonth;
  const horizonMonths = generateMonthRange(startMonth, assumptions.forecastHorizonMonths);
  const demandByMonth = computeDemandBurden(scenario, productivityWeights);
  const asOfDate = `${startMonth}-01`;
  const eligible = getEligibleResources(scenario.caseType, scenario.caseSubtype, resources, skillMappings, asOfDate);

  let carriedBacklog = 0;
  let backlogEverCreated = false;
  let clearanceMonth: string | null = null;
  let peakBacklog = 0;
  const horizon: MonthlyForecastPoint[] = [];

  for (const month of horizonMonths) {
    const totalCapacity = computeMonthlyCapacity(month, eligible, assumptions);
    const workloadBurden = computeCurrentWorkloadBurden(month, currentWorkload, productivityWeights, assumptions);
    const availableCapacity = Math.max(0, totalCapacity - workloadBurden);
    const scenarioDemand = demandByMonth.get(month) ?? 0;
    const monthDemand = scenarioDemand + carriedBacklog;

    let newBacklog = 0;
    let endingBacklog = 0;

    if (monthDemand > availableCapacity) {
      newBacklog = monthDemand - availableCapacity;
      endingBacklog = newBacklog;
      backlogEverCreated = true;
    } else {
      // Drain any existing carried backlog
      const surplus = availableCapacity - scenarioDemand;
      const drained = Math.min(carriedBacklog, surplus);
      endingBacklog = Math.max(0, carriedBacklog - drained);
    }

    if (endingBacklog > peakBacklog) peakBacklog = endingBacklog;
    if (backlogEverCreated && endingBacklog === 0 && clearanceMonth === null) {
      clearanceMonth = month;
    }

    const utilization = availableCapacity > 0 ? monthDemand / availableCapacity : monthDemand > 0 ? Infinity : 0;
    let riskStatus: RiskStatus;
    if (utilization >= assumptions.riskConstrainedUtilizationPct) {
      riskStatus = 'Capacity Constrained';
    } else if (utilization >= assumptions.riskAtRiskUtilizationPct) {
      riskStatus = 'At Risk';
    } else {
      riskStatus = 'On Track';
    }

    horizon.push({
      month,
      availableCapacityPoints: availableCapacity,
      demandPoints: monthDemand,
      netCapacityPoints: availableCapacity - monthDemand,
      newBacklogPoints: newBacklog,
      carriedBacklogPoints: carriedBacklog,
      endingBacklogPoints: endingBacklog,
      riskStatus,
    });

    carriedBacklog = endingBacklog;
  }

  const requiredAdditionalFTE = Math.ceil(peakBacklog / assumptions.standardMonthlyCapacityPointsPerParalegal);
  const overallRisk: RiskStatus = peakBacklog > 0
    ? 'Capacity Constrained'
    : horizon.some(h => h.riskStatus === 'At Risk')
    ? 'At Risk'
    : 'On Track';

  let recommendedAction: string;
  if (peakBacklog === 0 && overallRisk === 'On Track') {
    recommendedAction = 'Current capacity is sufficient to absorb projected demand. No staffing changes required.';
  } else if (peakBacklog === 0 && overallRisk === 'At Risk') {
    recommendedAction = 'Capacity is near threshold. Monitor utilization closely and prepare contingency staffing plans.';
  } else if (requiredAdditionalFTE <= 2) {
    recommendedAction = `Add ${requiredAdditionalFTE} FTE(s) or stagger intake to prevent backlog. Consider redistributing to eligible resources.`;
  } else {
    recommendedAction = `Critical capacity gap. Add ${requiredAdditionalFTE} FTEs or negotiate phased intake with client. Backlog peaks at ${Math.round(peakBacklog)} points${clearanceMonth ? `, clears by ${clearanceMonth}` : ' (does not clear within horizon)'}.`;
  }

  return {
    scenarioId: scenario.scenarioId,
    horizon,
    totalBacklogPeakPoints: peakBacklog,
    estimatedClearanceMonth: clearanceMonth,
    requiredAdditionalFTE,
    recommendedAction,
    overallRiskStatus: overallRisk,
  };
}

export function runForecastForScenarios(
  scenarios: DemandScenario[],
  baseline: BaselineData,
  assumptions: Assumptions
): ForecastResult[] {
  return scenarios.map(s => runForecast(s, baseline, assumptions));
}
