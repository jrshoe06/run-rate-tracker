import { SkillMapping } from '@/types';

export const skillMappings: SkillMapping[] = [
  // P001 Sarah Chen - H-1B specialist
  { resourceId: 'P001', caseType: 'H-1B', capabilityLevel: 'Primary', effectiveStartDate: '2022-01-01' },
  { resourceId: 'P001', caseType: 'H-1B Extension', capabilityLevel: 'Primary', effectiveStartDate: '2022-01-01' },
  { resourceId: 'P001', caseType: 'Change of Employer', capabilityLevel: 'Secondary', effectiveStartDate: '2023-01-01' },
  { resourceId: 'P001', caseType: 'Amendment', capabilityLevel: 'Secondary', effectiveStartDate: '2023-06-01' },

  // P002 Marcus Johnson - H-1B generalist
  { resourceId: 'P002', caseType: 'H-1B', capabilityLevel: 'Primary', effectiveStartDate: '2021-06-01' },
  { resourceId: 'P002', caseType: 'H-1B Extension', capabilityLevel: 'Primary', effectiveStartDate: '2021-06-01' },
  { resourceId: 'P002', caseType: 'CAP', capabilityLevel: 'Primary', effectiveStartDate: '2022-01-01' },
  { resourceId: 'P002', caseType: 'Change of Employer', capabilityLevel: 'Secondary', effectiveStartDate: '2022-06-01' },

  // P003 Priya Patel
  { resourceId: 'P003', caseType: 'H-1B', capabilityLevel: 'Primary', effectiveStartDate: '2023-01-01' },
  { resourceId: 'P003', caseType: 'H-1B Extension', capabilityLevel: 'Primary', effectiveStartDate: '2023-01-01' },
  { resourceId: 'P003', caseType: 'Amendment', capabilityLevel: 'Primary', effectiveStartDate: '2023-06-01' },

  // P004 James Williams
  { resourceId: 'P004', caseType: 'H-1B', capabilityLevel: 'Primary', effectiveStartDate: '2022-06-01' },
  { resourceId: 'P004', caseType: 'H-1B Extension', capabilityLevel: 'Primary', effectiveStartDate: '2022-06-01' },
  { resourceId: 'P004', caseType: 'CAP', capabilityLevel: 'Secondary', effectiveStartDate: '2023-01-01' },

  // P005 Maria Rodriguez - junior
  { resourceId: 'P005', caseType: 'H-1B Extension', capabilityLevel: 'Secondary', effectiveStartDate: '2024-01-01' },
  { resourceId: 'P005', caseType: 'Amendment', capabilityLevel: 'Trainee', effectiveStartDate: '2024-06-01' },

  // P006 Kevin Zhang
  { resourceId: 'P006', caseType: 'H-1B', capabilityLevel: 'Primary', effectiveStartDate: '2021-01-01' },
  { resourceId: 'P006', caseType: 'H-1B Extension', capabilityLevel: 'Primary', effectiveStartDate: '2021-01-01' },
  { resourceId: 'P006', caseType: 'Change of Employer', capabilityLevel: 'Primary', effectiveStartDate: '2022-01-01' },
  { resourceId: 'P006', caseType: 'CAP', capabilityLevel: 'Primary', effectiveStartDate: '2022-01-01' },

  // P007 Lisa Thompson
  { resourceId: 'P007', caseType: 'H-1B', capabilityLevel: 'Primary', effectiveStartDate: '2022-01-01' },
  { resourceId: 'P007', caseType: 'H-1B Extension', capabilityLevel: 'Primary', effectiveStartDate: '2022-01-01' },
  { resourceId: 'P007', caseType: 'Change of Employer', capabilityLevel: 'Secondary', effectiveStartDate: '2023-01-01' },

  // P008 David Kim
  { resourceId: 'P008', caseType: 'H-1B Extension', capabilityLevel: 'Primary', effectiveStartDate: '2022-06-01' },
  { resourceId: 'P008', caseType: 'CAP', capabilityLevel: 'Primary', effectiveStartDate: '2022-06-01' },
  { resourceId: 'P008', caseType: 'H-1B', capabilityLevel: 'Secondary', effectiveStartDate: '2023-06-01' },

  // P009 Amanda Foster
  { resourceId: 'P009', caseType: 'H-1B', capabilityLevel: 'Primary', effectiveStartDate: '2023-06-01' },
  { resourceId: 'P009', caseType: 'H-1B Extension', capabilityLevel: 'Primary', effectiveStartDate: '2023-01-01' },
  { resourceId: 'P009', caseType: 'Change of Employer', capabilityLevel: 'Secondary', effectiveStartDate: '2024-01-01' },

  // P010 Robert Lee - junior
  { resourceId: 'P010', caseType: 'H-1B Extension', capabilityLevel: 'Trainee', effectiveStartDate: '2024-06-01' },

  // P011 Jennifer Walsh - PERM Lead
  { resourceId: 'P011', caseType: 'PERM', capabilityLevel: 'Primary', effectiveStartDate: '2020-01-01' },
  { resourceId: 'P011', caseType: 'AOS', capabilityLevel: 'Secondary', effectiveStartDate: '2022-01-01' },

  // P012 Michael Torres - PERM specialist
  { resourceId: 'P012', caseType: 'PERM', capabilityLevel: 'Primary', effectiveStartDate: '2021-01-01' },
  { resourceId: 'P012', caseType: 'AOS', capabilityLevel: 'Secondary', effectiveStartDate: '2022-06-01' },

  // P013 Nancy Brown
  { resourceId: 'P013', caseType: 'PERM', capabilityLevel: 'Primary', effectiveStartDate: '2021-06-01' },
  { resourceId: 'P013', caseType: 'AOS', capabilityLevel: 'Primary', effectiveStartDate: '2022-01-01' },

  // P014 Steven Clark
  { resourceId: 'P014', caseType: 'PERM', capabilityLevel: 'Primary', effectiveStartDate: '2022-01-01' },
  { resourceId: 'P014', caseType: 'AOS', capabilityLevel: 'Secondary', effectiveStartDate: '2023-01-01' },

  // P015 Angela Martinez - junior PERM
  { resourceId: 'P015', caseType: 'PERM', capabilityLevel: 'Secondary', effectiveStartDate: '2023-06-01' },
  { resourceId: 'P015', caseType: 'AOS', capabilityLevel: 'Trainee', effectiveStartDate: '2024-01-01' },

  // P016 Christopher Davis - AOS specialist
  { resourceId: 'P016', caseType: 'AOS', capabilityLevel: 'Primary', effectiveStartDate: '2021-01-01' },
  { resourceId: 'P016', caseType: 'PERM', capabilityLevel: 'Secondary', effectiveStartDate: '2022-06-01' },
  { resourceId: 'P016', caseType: 'Amendment', capabilityLevel: 'Secondary', effectiveStartDate: '2023-01-01' },

  // P017 Stephanie Wilson
  { resourceId: 'P017', caseType: 'AOS', capabilityLevel: 'Primary', effectiveStartDate: '2022-01-01' },
  { resourceId: 'P017', caseType: 'Amendment', capabilityLevel: 'Primary', effectiveStartDate: '2022-06-01' },

  // P018 Brian Anderson
  { resourceId: 'P018', caseType: 'AOS', capabilityLevel: 'Primary', effectiveStartDate: '2022-06-01' },
  { resourceId: 'P018', caseType: 'PERM', capabilityLevel: 'Secondary', effectiveStartDate: '2023-01-01' },

  // P019 Rachel Moore - junior AOS
  { resourceId: 'P019', caseType: 'AOS', capabilityLevel: 'Secondary', effectiveStartDate: '2023-06-01' },
  { resourceId: 'P019', caseType: 'Amendment', capabilityLevel: 'Trainee', effectiveStartDate: '2024-01-01' },

  // P020 Daniel Jackson - generalist
  { resourceId: 'P020', caseType: 'H-1B', capabilityLevel: 'Primary', effectiveStartDate: '2020-06-01' },
  { resourceId: 'P020', caseType: 'H-1B Extension', capabilityLevel: 'Primary', effectiveStartDate: '2020-06-01' },
  { resourceId: 'P020', caseType: 'Change of Employer', capabilityLevel: 'Primary', effectiveStartDate: '2021-01-01' },
  { resourceId: 'P020', caseType: 'Amendment', capabilityLevel: 'Primary', effectiveStartDate: '2021-01-01' },

  // P021 Patricia White
  { resourceId: 'P021', caseType: 'H-1B Extension', capabilityLevel: 'Primary', effectiveStartDate: '2022-01-01' },
  { resourceId: 'P021', caseType: 'Amendment', capabilityLevel: 'Primary', effectiveStartDate: '2022-01-01' },
  { resourceId: 'P021', caseType: 'Change of Employer', capabilityLevel: 'Secondary', effectiveStartDate: '2023-01-01' },

  // P022 Joshua Harris
  { resourceId: 'P022', caseType: 'Change of Employer', capabilityLevel: 'Primary', effectiveStartDate: '2021-06-01' },
  { resourceId: 'P022', caseType: 'H-1B', capabilityLevel: 'Secondary', effectiveStartDate: '2022-01-01' },
  { resourceId: 'P022', caseType: 'H-1B Extension', capabilityLevel: 'Secondary', effectiveStartDate: '2022-01-01' },

  // P023 Michelle Lewis
  { resourceId: 'P023', caseType: 'CAP', capabilityLevel: 'Primary', effectiveStartDate: '2021-01-01' },
  { resourceId: 'P023', caseType: 'H-1B', capabilityLevel: 'Primary', effectiveStartDate: '2021-01-01' },
  { resourceId: 'P023', caseType: 'H-1B Extension', capabilityLevel: 'Secondary', effectiveStartDate: '2022-01-01' },

  // P024 Andrew Robinson - junior
  { resourceId: 'P024', caseType: 'Amendment', capabilityLevel: 'Secondary', effectiveStartDate: '2023-06-01' },
  { resourceId: 'P024', caseType: 'H-1B Extension', capabilityLevel: 'Trainee', effectiveStartDate: '2024-01-01' },

  // P025 Sandra Walker - junior
  { resourceId: 'P025', caseType: 'AOS', capabilityLevel: 'Secondary', effectiveStartDate: '2024-01-01' },
  { resourceId: 'P025', caseType: 'Amendment', capabilityLevel: 'Trainee', effectiveStartDate: '2024-06-01' },

  // Attorneys - all can review all types
  { resourceId: 'A001', caseType: 'H-1B', capabilityLevel: 'Primary', effectiveStartDate: '2018-01-01' },
  { resourceId: 'A001', caseType: 'H-1B Extension', capabilityLevel: 'Primary', effectiveStartDate: '2018-01-01' },
  { resourceId: 'A001', caseType: 'Change of Employer', capabilityLevel: 'Primary', effectiveStartDate: '2018-01-01' },
  { resourceId: 'A001', caseType: 'CAP', capabilityLevel: 'Primary', effectiveStartDate: '2018-01-01' },
  { resourceId: 'A001', caseType: 'Amendment', capabilityLevel: 'Primary', effectiveStartDate: '2018-01-01' },

  { resourceId: 'A002', caseType: 'H-1B', capabilityLevel: 'Primary', effectiveStartDate: '2019-01-01' },
  { resourceId: 'A002', caseType: 'H-1B Extension', capabilityLevel: 'Primary', effectiveStartDate: '2019-01-01' },
  { resourceId: 'A002', caseType: 'Change of Employer', capabilityLevel: 'Primary', effectiveStartDate: '2019-01-01' },
  { resourceId: 'A002', caseType: 'Amendment', capabilityLevel: 'Primary', effectiveStartDate: '2019-01-01' },
  { resourceId: 'A002', caseType: 'CAP', capabilityLevel: 'Secondary', effectiveStartDate: '2020-01-01' },

  { resourceId: 'A003', caseType: 'PERM', capabilityLevel: 'Primary', effectiveStartDate: '2018-01-01' },
  { resourceId: 'A003', caseType: 'AOS', capabilityLevel: 'Primary', effectiveStartDate: '2018-01-01' },
  { resourceId: 'A003', caseType: 'H-1B', capabilityLevel: 'Secondary', effectiveStartDate: '2020-01-01' },
  { resourceId: 'A003', caseType: 'H-1B Extension', capabilityLevel: 'Secondary', effectiveStartDate: '2020-01-01' },

  { resourceId: 'A004', caseType: 'AOS', capabilityLevel: 'Primary', effectiveStartDate: '2019-01-01' },
  { resourceId: 'A004', caseType: 'PERM', capabilityLevel: 'Primary', effectiveStartDate: '2019-01-01' },
  { resourceId: 'A004', caseType: 'Amendment', capabilityLevel: 'Secondary', effectiveStartDate: '2021-01-01' },

  { resourceId: 'A005', caseType: 'H-1B', capabilityLevel: 'Primary', effectiveStartDate: '2020-01-01' },
  { resourceId: 'A005', caseType: 'H-1B Extension', capabilityLevel: 'Primary', effectiveStartDate: '2020-01-01' },
  { resourceId: 'A005', caseType: 'CAP', capabilityLevel: 'Primary', effectiveStartDate: '2020-01-01' },
  { resourceId: 'A005', caseType: 'Change of Employer', capabilityLevel: 'Primary', effectiveStartDate: '2021-01-01' },

  { resourceId: 'A006', caseType: 'PERM', capabilityLevel: 'Primary', effectiveStartDate: '2020-06-01' },
  { resourceId: 'A006', caseType: 'AOS', capabilityLevel: 'Primary', effectiveStartDate: '2020-06-01' },
  { resourceId: 'A006', caseType: 'Amendment', capabilityLevel: 'Primary', effectiveStartDate: '2021-06-01' },

  { resourceId: 'A007', caseType: 'H-1B Extension', capabilityLevel: 'Primary', effectiveStartDate: '2021-01-01' },
  { resourceId: 'A007', caseType: 'H-1B', capabilityLevel: 'Primary', effectiveStartDate: '2021-01-01' },
  { resourceId: 'A007', caseType: 'Change of Employer', capabilityLevel: 'Primary', effectiveStartDate: '2022-01-01' },
  { resourceId: 'A007', caseType: 'AOS', capabilityLevel: 'Secondary', effectiveStartDate: '2023-01-01' },
];
