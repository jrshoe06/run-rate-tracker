export type Role = 'Paralegal' | 'Attorney' | 'Support';
export type CapabilityLevel = 'Primary' | 'Secondary' | 'Trainee' | 'NotEligible';
export type RiskStatus = 'On Track' | 'At Risk' | 'Capacity Constrained';
export type CaseType = 'H-1B' | 'H-1B Extension' | 'Change of Employer' | 'PERM' | 'AOS' | 'Amendment' | 'CAP';

export interface CurrentWorkloadItem {
  caseId: string;
  clientName: string;
  caseType: CaseType;
  caseSubtype?: string;
  currentStage: string;
  milestone: string;
  assignedParalegalId?: string;
  assignedAttorneyId?: string;
  openedDate: string;
  targetFileDate: string;
  currentProductivityWeight: number;
  isActionable: boolean;
  isFiled: boolean;
  isOnHold: boolean;
}

export interface ResourceCapacity {
  resourceId: string;
  name: string;
  role: Role;
  team: string;
  clientAccount: string;
  monthlyCapacityPoints: number;
  availableCapacityPoints: number;
  unavailableDates: string[];
  seniorityLevel: 'Junior' | 'Mid' | 'Senior' | 'Lead';
  isActive: boolean;
}

export interface SkillMapping {
  resourceId: string;
  caseType: CaseType;
  caseSubtype?: string;
  capabilityLevel: CapabilityLevel;
  effectiveStartDate: string;
  effectiveEndDate?: string;
  allocationPreferencePercent?: number;
}

export interface ProductivityWeight {
  caseType: CaseType;
  caseSubtype?: string;
  stage?: string;
  paralegalWeight: number;
  attorneyWeight: number;
  expectedCycleDays: number;
  expectedMonthlyThroughputPerFTE: number;
}

export interface DemandScenario {
  scenarioId: string;
  scenarioName: string;
  clientName: string;
  caseType: CaseType;
  caseSubtype?: string;
  projectedVolume: number;
  projectedStartMonth: string;
  targetCompletionMonth: string;
  expectedCycleTimeOverrideDays?: number;
  productivityWeightOverride?: number;
  notes?: string;
}

export interface Assumptions {
  standardMonthlyCapacityPointsPerParalegal: number;
  standardMonthlyCapacityPointsPerAttorney: number;
  includeAttorneyCapacity: boolean;
  excludeOnHoldCases: boolean;
  excludeNonActionableCases: boolean;
  forecastHorizonMonths: number;
  targetCycleDaysForBacklog: number;
  riskAtRiskUtilizationPct: number;
  riskConstrainedUtilizationPct: number;
}

export interface MonthlyForecastPoint {
  month: string;
  availableCapacityPoints: number;
  demandPoints: number;
  netCapacityPoints: number;
  newBacklogPoints: number;
  carriedBacklogPoints: number;
  endingBacklogPoints: number;
  riskStatus: RiskStatus;
}

export interface ForecastResult {
  scenarioId: string;
  horizon: MonthlyForecastPoint[];
  totalBacklogPeakPoints: number;
  estimatedClearanceMonth: string | null;
  requiredAdditionalFTE: number;
  recommendedAction: string;
  overallRiskStatus: RiskStatus;
}

export interface BaselineData {
  resources: ResourceCapacity[];
  skillMappings: SkillMapping[];
  productivityWeights: ProductivityWeight[];
  currentWorkload: CurrentWorkloadItem[];
}

export interface ExternalForecastView {
  scenarioId: string;
  projectedVolume: number;
  capacityBand: 'Low' | 'Medium' | 'High';
  expectedThroughputPerMonth: number;
  monthlyBacklogTrend: Array<{ month: string; backlogPoints: number }>;
  estimatedCompletionWindow: string | null;
  riskStatus: RiskStatus;
  recommendedAction: string;
}
