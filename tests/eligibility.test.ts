import { describe, it, expect } from 'vitest';
import { getEligibleResources } from '@/lib/forecast/engine';
import type { ResourceCapacity, SkillMapping } from '@/types';

const makeResource = (overrides: Partial<ResourceCapacity> = {}): ResourceCapacity => ({
  resourceId: 'R001',
  name: 'Test',
  role: 'Paralegal',
  team: 'Test',
  clientAccount: 'TestCo',
  monthlyCapacityPoints: 100,
  availableCapacityPoints: 100,
  unavailableDates: [],
  seniorityLevel: 'Mid',
  isActive: true,
  ...overrides,
});

const makeMapping = (overrides: Partial<SkillMapping> = {}): SkillMapping => ({
  resourceId: 'R001',
  caseType: 'H-1B Extension',
  capabilityLevel: 'Primary',
  effectiveStartDate: '2020-01-01',
  ...overrides,
});

describe('Eligibility', () => {
  it('includes Primary and Secondary resources', () => {
    const resources = [
      makeResource({ resourceId: 'R001' }),
      makeResource({ resourceId: 'R002' }),
    ];
    const mappings = [
      makeMapping({ resourceId: 'R001', capabilityLevel: 'Primary' }),
      makeMapping({ resourceId: 'R002', capabilityLevel: 'Secondary' }),
    ];
    const result = getEligibleResources('H-1B Extension', undefined, resources, mappings, '2026-01-01');
    expect(result.map(r => r.resourceId)).toContain('R001');
    expect(result.map(r => r.resourceId)).toContain('R002');
  });

  it('excludes Trainee resources by default', () => {
    const resources = [makeResource()];
    const mappings = [makeMapping({ capabilityLevel: 'Trainee' })];
    const result = getEligibleResources('H-1B Extension', undefined, resources, mappings, '2026-01-01');
    expect(result).toHaveLength(0);
  });

  it('includes Trainee when includeTrainee=true', () => {
    const resources = [makeResource()];
    const mappings = [makeMapping({ capabilityLevel: 'Trainee' })];
    const result = getEligibleResources('H-1B Extension', undefined, resources, mappings, '2026-01-01', true);
    expect(result).toHaveLength(1);
  });

  it('excludes inactive resources', () => {
    const resources = [makeResource({ isActive: false })];
    const mappings = [makeMapping()];
    const result = getEligibleResources('H-1B Extension', undefined, resources, mappings, '2026-01-01');
    expect(result).toHaveLength(0);
  });

  it('excludes resources with effectiveEndDate in the past', () => {
    const resources = [makeResource()];
    const mappings = [makeMapping({ effectiveEndDate: '2025-01-01' })];
    const result = getEligibleResources('H-1B Extension', undefined, resources, mappings, '2026-01-01');
    expect(result).toHaveLength(0);
  });

  it('excludes resources whose effectiveStartDate is in the future', () => {
    const resources = [makeResource()];
    const mappings = [makeMapping({ effectiveStartDate: '2027-01-01' })];
    const result = getEligibleResources('H-1B Extension', undefined, resources, mappings, '2026-01-01');
    expect(result).toHaveLength(0);
  });

  it('excludes NotEligible resources', () => {
    const resources = [makeResource()];
    const mappings = [makeMapping({ capabilityLevel: 'NotEligible' })];
    const result = getEligibleResources('H-1B Extension', undefined, resources, mappings, '2026-01-01');
    expect(result).toHaveLength(0);
  });
});
