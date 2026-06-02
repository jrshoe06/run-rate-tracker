import { describe, it, expect } from 'vitest';
import { runForecast, computeDemandBurden, computeMonthlyCapacity } from '@/lib/forecast/engine';
import { defaultAssumptions } from '@/lib/assumptions';
import type { BaselineData, DemandScenario, ResourceCapacity, SkillMapping, ProductivityWeight } from '@/types';

// Minimal test fixtures
const testResource: ResourceCapacity = {
  resourceId: 'R001',
  name: 'Test Paralegal',
  role: 'Paralegal',
  team: 'Test',
  clientAccount: 'TestCo',
  monthlyCapacityPoints: 100,
  availableCapacityPoints: 100,
  unavailableDates: [],
  seniorityLevel: 'Mid',
  isActive: true,
};

const testSkillMapping: SkillMapping = {
  resourceId: 'R001',
  caseType: 'H-1B Extension',
  capabilityLevel: 'Primary',
  effectiveStartDate: '2020-01-01',
};

const testWeight: ProductivityWeight = {
  caseType: 'H-1B Extension',
  paralegalWeight: 5,
  attorneyWeight: 2,
  expectedCycleDays: 30,
  expectedMonthlyThroughputPerFTE: 10,
};

const baselineNoWorkload: BaselineData = {
  resources: [testResource],
  skillMappings: [testSkillMapping],
  productivityWeights: [testWeight],
  currentWorkload: [],
};

const scenario: DemandScenario = {
  scenarioId: 'TEST-001',
  scenarioName: 'Test Scenario',
  clientName: 'TestCo',
  caseType: 'H-1B Extension',
  projectedVolume: 5,
  projectedStartMonth: '2026-01',
  targetCompletionMonth: '2026-01',
};

describe('Forecast Engine', () => {
  it('demand < capacity → no backlog created', () => {
    // 5 cases * 5 weight = 25 points demand; resource has 100 capacity
    const result = runForecast(scenario, baselineNoWorkload, defaultAssumptions);
    const jan = result.horizon.find(h => h.month === '2026-01');
    expect(jan).toBeDefined();
    expect(jan!.endingBacklogPoints).toBe(0);
    expect(jan!.newBacklogPoints).toBe(0);
    expect(result.totalBacklogPeakPoints).toBe(0);
  });

  it('demand > capacity → backlog created with correct excess', () => {
    const highDemandScenario: DemandScenario = {
      ...scenario,
      projectedVolume: 30, // 30 * 5 = 150 points > 100 capacity
      targetCompletionMonth: '2026-01',
    };
    const result = runForecast(highDemandScenario, baselineNoWorkload, defaultAssumptions);
    const jan = result.horizon.find(h => h.month === '2026-01');
    expect(jan!.endingBacklogPoints).toBeGreaterThan(0);
    expect(jan!.newBacklogPoints).toBe(jan!.endingBacklogPoints);
    expect(result.totalBacklogPeakPoints).toBeGreaterThan(0);
  });

  it('backlog carries forward and drains in later months', () => {
    const highDemandScenario: DemandScenario = {
      ...scenario,
      projectedVolume: 30,
      projectedStartMonth: '2026-01',
      targetCompletionMonth: '2026-01', // demand only in Jan
    };
    const result = runForecast(highDemandScenario, baselineNoWorkload, defaultAssumptions);
    const jan = result.horizon.find(h => h.month === '2026-01');
    expect(jan!.endingBacklogPoints).toBeGreaterThan(0);
    // In Feb, no new demand - backlog should be drained by available capacity
    const feb = result.horizon.find(h => h.month === '2026-02');
    expect(feb!.carriedBacklogPoints).toBe(jan!.endingBacklogPoints);
    expect(feb!.endingBacklogPoints).toBeLessThan(feb!.carriedBacklogPoints);
  });

  it('requiredAdditionalFTE math is correct', () => {
    const highDemandScenario: DemandScenario = {
      ...scenario,
      projectedVolume: 100, // 100 * 5 = 500 points; resource has 100 cap → backlog = 400
      targetCompletionMonth: '2026-01',
    };
    const result = runForecast(highDemandScenario, baselineNoWorkload, defaultAssumptions);
    // Math.ceil(peakBacklog / 100)
    expect(result.requiredAdditionalFTE).toBe(Math.ceil(result.totalBacklogPeakPoints / defaultAssumptions.standardMonthlyCapacityPointsPerParalegal));
  });

  it('estimatedClearanceMonth returns null when backlog never clears within horizon', () => {
    const massiveDemandScenario: DemandScenario = {
      ...scenario,
      projectedVolume: 10000,
      targetCompletionMonth: '2026-01',
    };
    const result = runForecast(massiveDemandScenario, baselineNoWorkload, { ...defaultAssumptions, forecastHorizonMonths: 3 });
    expect(result.estimatedClearanceMonth).toBeNull();
  });

  it('risk status On Track when utilization below threshold', () => {
    const result = runForecast(scenario, baselineNoWorkload, defaultAssumptions);
    const jan = result.horizon.find(h => h.month === '2026-01')!;
    expect(jan.riskStatus).toBe('On Track');
  });

  it('risk status At Risk when utilization between thresholds', () => {
    // 100 capacity, need utilization 0.85-1.0 → demand 85-100 pts → 17-20 cases at weight 5
    const atRiskScenario: DemandScenario = { ...scenario, projectedVolume: 18 }; // 90 pts / 100 capacity = 0.9 (between 0.85 and 1.0)
    const result = runForecast(atRiskScenario, baselineNoWorkload, defaultAssumptions);
    const jan = result.horizon.find(h => h.month === '2026-01')!;
    expect(jan.riskStatus).toBe('At Risk');
  });

  it('risk status Capacity Constrained when utilization >= 1.0', () => {
    const constrainedScenario: DemandScenario = { ...scenario, projectedVolume: 25 }; // 125 pts > 100 capacity
    const result = runForecast(constrainedScenario, baselineNoWorkload, defaultAssumptions);
    const jan = result.horizon.find(h => h.month === '2026-01')!;
    expect(jan.riskStatus).toBe('Capacity Constrained');
  });
});
