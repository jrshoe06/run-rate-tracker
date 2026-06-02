import { ResourceCapacity } from '@/types';

export const resources: ResourceCapacity[] = [
  // Paralegals - Google-NCE-A team (H-1B / Extension specialists)
  { resourceId: 'P001', name: 'Sarah Chen', role: 'Paralegal', team: 'Google-NCE-A', clientAccount: 'Google', monthlyCapacityPoints: 100, availableCapacityPoints: 100, unavailableDates: [], seniorityLevel: 'Senior', isActive: true },
  { resourceId: 'P002', name: 'Marcus Johnson', role: 'Paralegal', team: 'Google-NCE-A', clientAccount: 'Google', monthlyCapacityPoints: 100, availableCapacityPoints: 100, unavailableDates: [], seniorityLevel: 'Senior', isActive: true },
  { resourceId: 'P003', name: 'Priya Patel', role: 'Paralegal', team: 'Google-NCE-A', clientAccount: 'Google', monthlyCapacityPoints: 100, availableCapacityPoints: 100, unavailableDates: [], seniorityLevel: 'Mid', isActive: true },
  { resourceId: 'P004', name: 'James Williams', role: 'Paralegal', team: 'Google-NCE-A', clientAccount: 'Google', monthlyCapacityPoints: 100, availableCapacityPoints: 100, unavailableDates: [], seniorityLevel: 'Mid', isActive: true },
  { resourceId: 'P005', name: 'Maria Rodriguez', role: 'Paralegal', team: 'Google-NCE-A', clientAccount: 'Google', monthlyCapacityPoints: 80, availableCapacityPoints: 80, unavailableDates: [], seniorityLevel: 'Junior', isActive: true },
  // Paralegals - Google-NCE-B team
  { resourceId: 'P006', name: 'Kevin Zhang', role: 'Paralegal', team: 'Google-NCE-B', clientAccount: 'Google', monthlyCapacityPoints: 100, availableCapacityPoints: 100, unavailableDates: [], seniorityLevel: 'Senior', isActive: true },
  { resourceId: 'P007', name: 'Lisa Thompson', role: 'Paralegal', team: 'Google-NCE-B', clientAccount: 'Google', monthlyCapacityPoints: 100, availableCapacityPoints: 100, unavailableDates: [], seniorityLevel: 'Mid', isActive: true },
  { resourceId: 'P008', name: 'David Kim', role: 'Paralegal', team: 'Google-NCE-B', clientAccount: 'Google', monthlyCapacityPoints: 100, availableCapacityPoints: 100, unavailableDates: [], seniorityLevel: 'Mid', isActive: true },
  { resourceId: 'P009', name: 'Amanda Foster', role: 'Paralegal', team: 'Google-NCE-B', clientAccount: 'Google', monthlyCapacityPoints: 100, availableCapacityPoints: 100, unavailableDates: [], seniorityLevel: 'Mid', isActive: true },
  { resourceId: 'P010', name: 'Robert Lee', role: 'Paralegal', team: 'Google-NCE-B', clientAccount: 'Google', monthlyCapacityPoints: 80, availableCapacityPoints: 80, unavailableDates: [], seniorityLevel: 'Junior', isActive: true },
  // Paralegals - Google-PERM team (PERM specialists)
  { resourceId: 'P011', name: 'Jennifer Walsh', role: 'Paralegal', team: 'Google-PERM', clientAccount: 'Google', monthlyCapacityPoints: 100, availableCapacityPoints: 100, unavailableDates: [], seniorityLevel: 'Lead', isActive: true },
  { resourceId: 'P012', name: 'Michael Torres', role: 'Paralegal', team: 'Google-PERM', clientAccount: 'Google', monthlyCapacityPoints: 100, availableCapacityPoints: 100, unavailableDates: [], seniorityLevel: 'Senior', isActive: true },
  { resourceId: 'P013', name: 'Nancy Brown', role: 'Paralegal', team: 'Google-PERM', clientAccount: 'Google', monthlyCapacityPoints: 100, availableCapacityPoints: 100, unavailableDates: [], seniorityLevel: 'Senior', isActive: true },
  { resourceId: 'P014', name: 'Steven Clark', role: 'Paralegal', team: 'Google-PERM', clientAccount: 'Google', monthlyCapacityPoints: 100, availableCapacityPoints: 100, unavailableDates: [], seniorityLevel: 'Mid', isActive: true },
  { resourceId: 'P015', name: 'Angela Martinez', role: 'Paralegal', team: 'Google-PERM', clientAccount: 'Google', monthlyCapacityPoints: 80, availableCapacityPoints: 80, unavailableDates: [], seniorityLevel: 'Junior', isActive: true },
  // Paralegals - Google-AOS team
  { resourceId: 'P016', name: 'Christopher Davis', role: 'Paralegal', team: 'Google-AOS', clientAccount: 'Google', monthlyCapacityPoints: 100, availableCapacityPoints: 100, unavailableDates: [], seniorityLevel: 'Senior', isActive: true },
  { resourceId: 'P017', name: 'Stephanie Wilson', role: 'Paralegal', team: 'Google-AOS', clientAccount: 'Google', monthlyCapacityPoints: 100, availableCapacityPoints: 100, unavailableDates: [], seniorityLevel: 'Mid', isActive: true },
  { resourceId: 'P018', name: 'Brian Anderson', role: 'Paralegal', team: 'Google-AOS', clientAccount: 'Google', monthlyCapacityPoints: 100, availableCapacityPoints: 100, unavailableDates: [], seniorityLevel: 'Mid', isActive: true },
  { resourceId: 'P019', name: 'Rachel Moore', role: 'Paralegal', team: 'Google-AOS', clientAccount: 'Google', monthlyCapacityPoints: 80, availableCapacityPoints: 80, unavailableDates: [], seniorityLevel: 'Junior', isActive: true },
  // General / Mixed team paralegals
  { resourceId: 'P020', name: 'Daniel Jackson', role: 'Paralegal', team: 'Google-GEN', clientAccount: 'Google', monthlyCapacityPoints: 100, availableCapacityPoints: 100, unavailableDates: [], seniorityLevel: 'Senior', isActive: true },
  { resourceId: 'P021', name: 'Patricia White', role: 'Paralegal', team: 'Google-GEN', clientAccount: 'Google', monthlyCapacityPoints: 100, availableCapacityPoints: 100, unavailableDates: [], seniorityLevel: 'Mid', isActive: true },
  { resourceId: 'P022', name: 'Joshua Harris', role: 'Paralegal', team: 'Google-GEN', clientAccount: 'Google', monthlyCapacityPoints: 100, availableCapacityPoints: 100, unavailableDates: [], seniorityLevel: 'Mid', isActive: true },
  { resourceId: 'P023', name: 'Michelle Lewis', role: 'Paralegal', team: 'Google-GEN', clientAccount: 'Google', monthlyCapacityPoints: 100, availableCapacityPoints: 100, unavailableDates: [], seniorityLevel: 'Mid', isActive: true },
  { resourceId: 'P024', name: 'Andrew Robinson', role: 'Paralegal', team: 'Google-GEN', clientAccount: 'Google', monthlyCapacityPoints: 80, availableCapacityPoints: 80, unavailableDates: [], seniorityLevel: 'Junior', isActive: true },
  { resourceId: 'P025', name: 'Sandra Walker', role: 'Paralegal', team: 'Google-GEN', clientAccount: 'Google', monthlyCapacityPoints: 80, availableCapacityPoints: 80, unavailableDates: [], seniorityLevel: 'Junior', isActive: true },
  // Attorneys
  { resourceId: 'A001', name: 'Elizabeth Carter', role: 'Attorney', team: 'Google-NCE-A', clientAccount: 'Google', monthlyCapacityPoints: 60, availableCapacityPoints: 60, unavailableDates: [], seniorityLevel: 'Lead', isActive: true },
  { resourceId: 'A002', name: 'William Hayes', role: 'Attorney', team: 'Google-NCE-B', clientAccount: 'Google', monthlyCapacityPoints: 60, availableCapacityPoints: 60, unavailableDates: [], seniorityLevel: 'Senior', isActive: true },
  { resourceId: 'A003', name: 'Catherine Morgan', role: 'Attorney', team: 'Google-PERM', clientAccount: 'Google', monthlyCapacityPoints: 60, availableCapacityPoints: 60, unavailableDates: [], seniorityLevel: 'Senior', isActive: true },
  { resourceId: 'A004', name: 'Thomas Bryant', role: 'Attorney', team: 'Google-AOS', clientAccount: 'Google', monthlyCapacityPoints: 60, availableCapacityPoints: 60, unavailableDates: [], seniorityLevel: 'Senior', isActive: true },
  { resourceId: 'A005', name: 'Rebecca Stone', role: 'Attorney', team: 'Google-GEN', clientAccount: 'Google', monthlyCapacityPoints: 60, availableCapacityPoints: 60, unavailableDates: [], seniorityLevel: 'Mid', isActive: true },
  { resourceId: 'A006', name: 'Charles Newton', role: 'Attorney', team: 'Google-GEN', clientAccount: 'Google', monthlyCapacityPoints: 60, availableCapacityPoints: 60, unavailableDates: [], seniorityLevel: 'Mid', isActive: true },
  { resourceId: 'A007', name: 'Dorothy Phillips', role: 'Attorney', team: 'Google-GEN', clientAccount: 'Google', monthlyCapacityPoints: 60, availableCapacityPoints: 60, unavailableDates: [], seniorityLevel: 'Mid', isActive: true },
];
