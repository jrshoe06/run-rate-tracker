import { Assumptions } from '@/types';

export const defaultAssumptions: Assumptions = {
  standardMonthlyCapacityPointsPerParalegal: 100,
  standardMonthlyCapacityPointsPerAttorney: 60,
  includeAttorneyCapacity: true,
  excludeOnHoldCases: true,
  excludeNonActionableCases: true,
  forecastHorizonMonths: 12,
  targetCycleDaysForBacklog: 60,
  riskAtRiskUtilizationPct: 0.85,
  riskConstrainedUtilizationPct: 1.0,
};
