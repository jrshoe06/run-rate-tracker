/**
 * Redaction Module
 *
 * Contract: toExternalView() MUST NOT expose any of the following:
 * - Individual resource names or IDs (name, resourceId, assignedParalegalId, assignedAttorneyId)
 * - Per-person capacity data (monthlyCapacityPoints, availableCapacityPoints)
 * - Raw skill mappings (skillMappings, capabilityLevel per person)
 * - Individual workload or backlog details (per-case data)
 *
 * The function returns only aggregate, anonymized, client-safe information.
 */

import { ForecastResult, DemandScenario, ExternalForecastView } from '@/types';

const FORBIDDEN_KEYS = new Set([
  'name', 'resourceId', 'assignedParalegalId', 'assignedAttorneyId',
  'monthlyCapacityPoints', 'availableCapacityPoints', 'skillMappings',
  'capabilityLevel', 'team', 'seniorityLevel', 'unavailableDates',
]);

function getCapacityBand(availablePoints: number): 'Low' | 'Medium' | 'High' {
  if (availablePoints < 500) return 'Low';
  if (availablePoints < 1500) return 'Medium';
  return 'High';
}

export function toExternalView(
  forecast: ForecastResult,
  scenario: DemandScenario,
  avgAvailableCapacity: number
): ExternalForecastView {
  return {
    scenarioId: forecast.scenarioId,
    projectedVolume: scenario.projectedVolume,
    capacityBand: getCapacityBand(avgAvailableCapacity),
    expectedThroughputPerMonth: avgAvailableCapacity > 0 ? Math.round(avgAvailableCapacity / 5) : 0,
    monthlyBacklogTrend: forecast.horizon.map(h => ({
      month: h.month,
      backlogPoints: h.endingBacklogPoints,
    })),
    estimatedCompletionWindow: forecast.estimatedClearanceMonth,
    riskStatus: forecast.overallRiskStatus,
    recommendedAction: forecast.recommendedAction,
  };
}

export function deepScanForForbiddenKeys(obj: unknown, path = ''): string[] {
  const violations: string[] = [];
  if (typeof obj !== 'object' || obj === null) return violations;
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    if (FORBIDDEN_KEYS.has(key)) {
      violations.push(`${path}.${key}`);
    }
    violations.push(...deepScanForForbiddenKeys(value, `${path}.${key}`));
  }
  return violations;
}
