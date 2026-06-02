import { describe, it, expect } from 'vitest';
import { toExternalView, deepScanForForbiddenKeys } from '@/lib/forecast/redact';
import type { ForecastResult, DemandScenario } from '@/types';

const mockForecast: ForecastResult = {
  scenarioId: 'SC001',
  horizon: [
    {
      month: '2026-07',
      availableCapacityPoints: 800,
      demandPoints: 600,
      netCapacityPoints: 200,
      newBacklogPoints: 0,
      carriedBacklogPoints: 0,
      endingBacklogPoints: 0,
      riskStatus: 'On Track',
    },
  ],
  totalBacklogPeakPoints: 0,
  estimatedClearanceMonth: null,
  requiredAdditionalFTE: 0,
  recommendedAction: 'No action needed.',
  overallRiskStatus: 'On Track',
};

const mockScenario: DemandScenario = {
  scenarioId: 'SC001',
  scenarioName: 'Test',
  clientName: 'Google',
  caseType: 'H-1B Extension',
  projectedVolume: 150,
  projectedStartMonth: '2026-07',
  targetCompletionMonth: '2026-09',
};

describe('Redaction', () => {
  it('toExternalView output contains no forbidden keys', () => {
    const external = toExternalView(mockForecast, mockScenario, 800);
    const violations = deepScanForForbiddenKeys(external);
    expect(violations).toHaveLength(0);
  });

  it('includes projectedVolume', () => {
    const external = toExternalView(mockForecast, mockScenario, 800);
    expect(external.projectedVolume).toBe(150);
  });

  it('includes riskStatus', () => {
    const external = toExternalView(mockForecast, mockScenario, 800);
    expect(external.riskStatus).toBe('On Track');
  });

  it('includes monthlyBacklogTrend with only month and backlogPoints', () => {
    const external = toExternalView(mockForecast, mockScenario, 800);
    expect(external.monthlyBacklogTrend[0]).toEqual({ month: '2026-07', backlogPoints: 0 });
    expect(Object.keys(external.monthlyBacklogTrend[0])).toEqual(['month', 'backlogPoints']);
  });

  it('deepScanForForbiddenKeys catches violations', () => {
    const dirty = { name: 'Alice', nested: { resourceId: 'R001', ok: 'yes' } };
    const violations = deepScanForForbiddenKeys(dirty);
    expect(violations).toContain('.name');
    expect(violations).toContain('.nested.resourceId');
  });
});
