import { DemandScenario } from '@/types';

export const seedScenarios: DemandScenario[] = [
  {
    scenarioId: 'SC001',
    scenarioName: 'Add 150 H-1B Extensions in July',
    clientName: 'Google',
    caseType: 'H-1B Extension',
    projectedVolume: 150,
    projectedStartMonth: '2026-07',
    targetCompletionMonth: '2026-09',
    notes: 'Seasonal extension spike from Google mobility team',
  },
  {
    scenarioId: 'SC002',
    scenarioName: 'Add 500 H-1B Cases Across Q3',
    clientName: 'Google',
    caseType: 'H-1B',
    projectedVolume: 500,
    projectedStartMonth: '2026-07',
    targetCompletionMonth: '2026-09',
    notes: 'Q3 new hire ramp - mixed new H-1B and transfers',
  },
  {
    scenarioId: 'SC003',
    scenarioName: 'Add 250 Amendments from Acquisition',
    clientName: 'Google',
    caseType: 'Amendment',
    projectedVolume: 250,
    projectedStartMonth: '2026-07',
    targetCompletionMonth: '2026-08',
    notes: 'Post-acquisition amendment wave for acquired employees',
  },
  {
    scenarioId: 'SC004',
    scenarioName: 'Add 1,000 PERM Matters over 2 Months',
    clientName: 'Google',
    caseType: 'PERM',
    projectedVolume: 1000,
    projectedStartMonth: '2026-07',
    targetCompletionMonth: '2026-08',
    notes: 'Annual PERM filing cycle - critical priority',
  },
];
