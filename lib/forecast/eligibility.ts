import { ResourceCapacity, SkillMapping, CaseType } from '@/types';
import { getEligibleResources } from './engine';

export function getCapacityByEligibility(
  caseType: CaseType,
  resources: ResourceCapacity[],
  skillMappings: SkillMapping[],
  asOfDate: string
) {
  const eligible = getEligibleResources(caseType, undefined, resources, skillMappings, asOfDate);
  const total = eligible.reduce((sum, r) => sum + r.monthlyCapacityPoints, 0);
  return { eligible, totalCapacityPoints: total };
}

export function getEligibilitySummary(
  resources: ResourceCapacity[],
  skillMappings: SkillMapping[],
  asOfDate: string
): Record<string, { primary: string[]; secondary: string[] }> {
  const caseTypes: CaseType[] = ['H-1B', 'H-1B Extension', 'Change of Employer', 'PERM', 'AOS', 'Amendment', 'CAP'];
  const result: Record<string, { primary: string[]; secondary: string[] }> = {};
  for (const ct of caseTypes) {
    const relevantMappings = skillMappings.filter(sm =>
      sm.caseType === ct &&
      sm.effectiveStartDate <= asOfDate &&
      (!sm.effectiveEndDate || sm.effectiveEndDate >= asOfDate)
    );
    result[ct] = {
      primary: relevantMappings.filter(sm => sm.capabilityLevel === 'Primary').map(sm => sm.resourceId),
      secondary: relevantMappings.filter(sm => sm.capabilityLevel === 'Secondary').map(sm => sm.resourceId),
    };
  }
  return result;
}
