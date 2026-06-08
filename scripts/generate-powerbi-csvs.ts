import fs from 'node:fs';
import path from 'node:path';

import { resources, skillMappings, productivityWeights, currentWorkload, seedScenarios } from '../data';

const repoRoot = path.resolve(__dirname, '..');
const outputDir = path.join(repoRoot, 'powerbi', 'data');

function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (Array.isArray(value)) return csvEscape(JSON.stringify(value));
  const text = String(value);
  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function writeCsv<T extends object>(fileName: string, rows: T[], columns: string[]): void {
  const header = columns.join(',');
  const lines = rows.map((row) => columns.map((col) => csvEscape((row as Record<string, unknown>)[col])).join(','));
  const content = [header, ...lines].join('\n') + '\n';
  fs.writeFileSync(path.join(outputDir, fileName), content, 'utf8');
}

function generateDateRows(): Record<string, unknown>[] {
  const rows: Record<string, unknown>[] = [];
  const today = new Date();
  const currentMonthKey = `${today.getUTCFullYear()}-${String(today.getUTCMonth() + 1).padStart(2, '0')}`;

  for (let year = 2024; year <= 2027; year++) {
    for (let month = 1; month <= 12; month++) {
      const monthStart = new Date(Date.UTC(year, month - 1, 1));
      const monthEnd = new Date(Date.UTC(year, month, 0));
      const monthKey = `${year}-${String(month).padStart(2, '0')}`;
      rows.push({
        Year: year,
        Quarter: `Q${Math.floor((month - 1) / 3) + 1}`,
        Month: month,
        MonthKey: monthKey,
        MonthStart: monthStart.toISOString().slice(0, 10),
        MonthEnd: monthEnd.toISOString().slice(0, 10),
        MonthName: monthStart.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' }),
        IsCurrentMonth: monthKey === currentMonthKey,
      });
    }
  }

  return rows;
}

function main(): void {
  fs.mkdirSync(outputDir, { recursive: true });

  writeCsv('Resources.csv', resources, [
    'resourceId',
    'name',
    'role',
    'team',
    'clientAccount',
    'monthlyCapacityPoints',
    'availableCapacityPoints',
    'unavailableDates',
    'seniorityLevel',
    'isActive',
  ]);

  writeCsv('SkillMappings.csv', skillMappings, [
    'resourceId',
    'caseType',
    'caseSubtype',
    'capabilityLevel',
    'effectiveStartDate',
    'effectiveEndDate',
    'allocationPreferencePercent',
  ]);

  writeCsv('ProductivityWeights.csv', productivityWeights, [
    'caseType',
    'caseSubtype',
    'stage',
    'paralegalWeight',
    'attorneyWeight',
    'expectedCycleDays',
    'expectedMonthlyThroughputPerFTE',
  ]);

  writeCsv('CurrentWorkload.csv', currentWorkload, [
    'caseId',
    'clientName',
    'caseType',
    'caseSubtype',
    'currentStage',
    'milestone',
    'assignedParalegalId',
    'assignedAttorneyId',
    'openedDate',
    'targetFileDate',
    'currentProductivityWeight',
    'isActionable',
    'isFiled',
    'isOnHold',
  ]);

  writeCsv('Scenarios.csv', seedScenarios, [
    'scenarioId',
    'scenarioName',
    'clientName',
    'caseType',
    'caseSubtype',
    'projectedVolume',
    'projectedStartMonth',
    'targetCompletionMonth',
    'expectedCycleTimeOverrideDays',
    'productivityWeightOverride',
    'notes',
  ]);

  writeCsv('DateTable.csv', generateDateRows(), [
    'Year',
    'Quarter',
    'Month',
    'MonthKey',
    'MonthStart',
    'MonthEnd',
    'MonthName',
    'IsCurrentMonth',
  ]);

  // eslint-disable-next-line no-console
  console.log(`Generated CSV fixtures in ${outputDir}`);
}

main();
