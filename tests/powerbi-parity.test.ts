/**
 * Power BI parity guardrail:
 *
 * This test validates that generated `/powerbi/data/*.csv` fixtures faithfully mirror
 * the TypeScript fixtures under `/data` (row counts + key-column hash parity).
 *
 * Full runtime DAX↔TS numeric parity requires evaluating measures in a tabular engine
 * (for example via Tabular Editor scripting). That evaluation is tracked using curated
 * golden checks documented in `/powerbi/docs/DAX_MEASURES.md` rather than executed here.
 */
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

import { resources, skillMappings, productivityWeights, currentWorkload, seedScenarios } from '@/data';

type Row = Record<string, string>;

function parseCsv(content: string): Row[] {
  const lines = content.trim().split(/\r?\n/);
  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const row: Row = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx] ?? '';
    });
    return row;
  });
}

function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (ch === ',' && !inQuotes) {
      out.push(current);
      current = '';
      continue;
    }
    current += ch;
  }

  out.push(current);
  return out;
}

function hashKeys(rows: string[]): string {
  return createHash('sha256').update(rows.join('\n')).digest('hex');
}

describe('powerbi csv parity', () => {
  const root = path.resolve(__dirname, '..');
  const powerbiData = path.join(root, 'powerbi', 'data');

  it('keeps csv row counts aligned with TS fixtures', () => {
    const resourcesCsv = parseCsv(fs.readFileSync(path.join(powerbiData, 'Resources.csv'), 'utf8'));
    const skillMappingsCsv = parseCsv(fs.readFileSync(path.join(powerbiData, 'SkillMappings.csv'), 'utf8'));
    const productivityCsv = parseCsv(fs.readFileSync(path.join(powerbiData, 'ProductivityWeights.csv'), 'utf8'));
    const workloadCsv = parseCsv(fs.readFileSync(path.join(powerbiData, 'CurrentWorkload.csv'), 'utf8'));
    const scenariosCsv = parseCsv(fs.readFileSync(path.join(powerbiData, 'Scenarios.csv'), 'utf8'));
    const dateTableCsv = parseCsv(fs.readFileSync(path.join(powerbiData, 'DateTable.csv'), 'utf8'));

    expect(resourcesCsv).toHaveLength(resources.length);
    expect(skillMappingsCsv).toHaveLength(skillMappings.length);
    expect(productivityCsv).toHaveLength(productivityWeights.length);
    expect(workloadCsv).toHaveLength(currentWorkload.length);
    expect(scenariosCsv).toHaveLength(seedScenarios.length);
    expect(dateTableCsv).toHaveLength(48); // Jan 2024 through Dec 2027
  });

  it('keeps key-column hashes aligned with TS fixtures', () => {
    const resourcesCsv = parseCsv(fs.readFileSync(path.join(powerbiData, 'Resources.csv'), 'utf8'));
    const skillMappingsCsv = parseCsv(fs.readFileSync(path.join(powerbiData, 'SkillMappings.csv'), 'utf8'));
    const productivityCsv = parseCsv(fs.readFileSync(path.join(powerbiData, 'ProductivityWeights.csv'), 'utf8'));
    const workloadCsv = parseCsv(fs.readFileSync(path.join(powerbiData, 'CurrentWorkload.csv'), 'utf8'));
    const scenariosCsv = parseCsv(fs.readFileSync(path.join(powerbiData, 'Scenarios.csv'), 'utf8'));

    const tsResourceKeys = resources.map((r) => r.resourceId);
    const csvResourceKeys = resourcesCsv.map((r) => r.resourceId);

    const tsSkillKeys = skillMappings.map((r) => `${r.resourceId}|${r.caseType}|${r.capabilityLevel}|${r.effectiveStartDate}`);
    const csvSkillKeys = skillMappingsCsv.map((r) => `${r.resourceId}|${r.caseType}|${r.capabilityLevel}|${r.effectiveStartDate}`);

    const tsWeightKeys = productivityWeights.map((r) => r.caseType);
    const csvWeightKeys = productivityCsv.map((r) => r.caseType);

    const tsWorkloadKeys = currentWorkload.map((r) => r.caseId);
    const csvWorkloadKeys = workloadCsv.map((r) => r.caseId);

    const tsScenarioKeys = seedScenarios.map((r) => r.scenarioId);
    const csvScenarioKeys = scenariosCsv.map((r) => r.scenarioId);

    expect(hashKeys(csvResourceKeys)).toBe(hashKeys(tsResourceKeys));
    expect(hashKeys(csvSkillKeys)).toBe(hashKeys(tsSkillKeys));
    expect(hashKeys(csvWeightKeys)).toBe(hashKeys(tsWeightKeys));
    expect(hashKeys(csvWorkloadKeys)).toBe(hashKeys(tsWorkloadKeys));
    expect(hashKeys(csvScenarioKeys)).toBe(hashKeys(tsScenarioKeys));
  });
});
