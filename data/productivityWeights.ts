import { ProductivityWeight } from '@/types';

export const productivityWeights: ProductivityWeight[] = [
  { caseType: 'H-1B', paralegalWeight: 5, attorneyWeight: 2, expectedCycleDays: 45, expectedMonthlyThroughputPerFTE: 6 },
  { caseType: 'H-1B Extension', paralegalWeight: 3, attorneyWeight: 1, expectedCycleDays: 30, expectedMonthlyThroughputPerFTE: 10 },
  { caseType: 'Change of Employer', paralegalWeight: 5, attorneyWeight: 2, expectedCycleDays: 45, expectedMonthlyThroughputPerFTE: 6 },
  { caseType: 'PERM', paralegalWeight: 8, attorneyWeight: 3, expectedCycleDays: 90, expectedMonthlyThroughputPerFTE: 3 },
  { caseType: 'AOS', paralegalWeight: 7, attorneyWeight: 3, expectedCycleDays: 75, expectedMonthlyThroughputPerFTE: 4 },
  { caseType: 'Amendment', paralegalWeight: 4, attorneyWeight: 2, expectedCycleDays: 40, expectedMonthlyThroughputPerFTE: 7 },
  { caseType: 'CAP', paralegalWeight: 6, attorneyWeight: 2, expectedCycleDays: 60, expectedMonthlyThroughputPerFTE: 5 },
];
