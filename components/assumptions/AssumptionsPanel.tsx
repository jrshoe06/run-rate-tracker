'use client';

import { Assumptions } from '@/types';
import { Card } from '@/components/ui/Card';

interface Props {
  assumptions: Assumptions;
  onChange: (assumptions: Assumptions) => void;
}

export function AssumptionsPanel({ assumptions, onChange }: Props) {
  function update<K extends keyof Assumptions>(key: K, value: Assumptions[K]) {
    onChange({ ...assumptions, [key]: value });
  }

  return (
    <Card>
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Assumptions</h3>
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <label className="text-gray-600">Forecast Horizon (months)</label>
          <input
            type="number"
            min={1}
            max={24}
            value={assumptions.forecastHorizonMonths}
            onChange={e => update('forecastHorizonMonths', Number(e.target.value))}
            className="w-16 text-right border rounded p-1 text-sm"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-gray-600">Paralegal Capacity (pts/mo)</label>
          <input
            type="number"
            min={10}
            max={200}
            value={assumptions.standardMonthlyCapacityPointsPerParalegal}
            onChange={e => update('standardMonthlyCapacityPointsPerParalegal', Number(e.target.value))}
            className="w-16 text-right border rounded p-1 text-sm"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-gray-600">At-Risk Threshold</label>
          <input
            type="number"
            min={0.5}
            max={1}
            step={0.05}
            value={assumptions.riskAtRiskUtilizationPct}
            onChange={e => update('riskAtRiskUtilizationPct', Number(e.target.value))}
            className="w-16 text-right border rounded p-1 text-sm"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-gray-600">Include Attorney Capacity</label>
          <input
            type="checkbox"
            checked={assumptions.includeAttorneyCapacity}
            onChange={e => update('includeAttorneyCapacity', e.target.checked)}
            className="rounded"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-gray-600">Exclude On-Hold Cases</label>
          <input
            type="checkbox"
            checked={assumptions.excludeOnHoldCases}
            onChange={e => update('excludeOnHoldCases', e.target.checked)}
            className="rounded"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-gray-600">Exclude Non-Actionable Cases</label>
          <input
            type="checkbox"
            checked={assumptions.excludeNonActionableCases}
            onChange={e => update('excludeNonActionableCases', e.target.checked)}
            className="rounded"
          />
        </div>
      </div>
    </Card>
  );
}
