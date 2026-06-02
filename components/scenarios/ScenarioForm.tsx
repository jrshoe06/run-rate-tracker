'use client';

import { useState } from 'react';
import { DemandScenario, CaseType } from '@/types';
import { Card } from '@/components/ui/Card';

interface Props {
  onSubmit: (scenario: DemandScenario) => void;
}

const caseTypes: CaseType[] = ['H-1B', 'H-1B Extension', 'Change of Employer', 'PERM', 'AOS', 'Amendment', 'CAP'];

export function ScenarioForm({ onSubmit }: Props) {
  const [form, setForm] = useState<Partial<DemandScenario>>({
    scenarioName: '',
    clientName: 'Google',
    caseType: 'H-1B',
    projectedVolume: 100,
    projectedStartMonth: '2026-07',
    targetCompletionMonth: '2026-09',
    notes: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'projectedVolume' ? Number(value) : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.scenarioName || !form.caseType) return;
    onSubmit({
      scenarioId: `SC-${Date.now()}`,
      scenarioName: form.scenarioName ?? '',
      clientName: form.clientName ?? 'Google',
      caseType: form.caseType as CaseType,
      projectedVolume: form.projectedVolume ?? 100,
      projectedStartMonth: form.projectedStartMonth ?? '2026-07',
      targetCompletionMonth: form.targetCompletionMonth ?? '2026-09',
      notes: form.notes,
    });
  }

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">Create Scenario</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">Scenario Name</label>
          <input
            type="text"
            name="scenarioName"
            value={form.scenarioName ?? ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm p-2 border"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Case Type</label>
          <select
            name="caseType"
            value={form.caseType ?? 'H-1B'}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm p-2 border"
          >
            {caseTypes.map(ct => (
              <option key={ct} value={ct}>{ct}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Projected Volume</label>
          <input
            type="number"
            name="projectedVolume"
            value={form.projectedVolume ?? 100}
            onChange={handleChange}
            min={1}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm p-2 border"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Month</label>
            <input
              type="month"
              name="projectedStartMonth"
              value={form.projectedStartMonth ?? '2026-07'}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Target Completion</label>
            <input
              type="month"
              name="targetCompletionMonth"
              value={form.targetCompletionMonth ?? '2026-09'}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm p-2 border"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            name="notes"
            value={form.notes ?? ''}
            onChange={handleChange}
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm p-2 border"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Run Forecast
        </button>
      </form>
    </Card>
  );
}
