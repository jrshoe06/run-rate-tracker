'use client';

import { useMemo } from 'react';
import { resources, skillMappings, productivityWeights, currentWorkload, seedScenarios } from '@/data';
import { runForecastForScenarios } from '@/lib/forecast/engine';
import { defaultAssumptions } from '@/lib/assumptions';
import { InternalView } from '@/components/views/InternalView';
import { Card } from '@/components/ui/Card';

const baseline = { resources, skillMappings, productivityWeights, currentWorkload };

export default function InternalPage() {
  const results = useMemo(
    () => runForecastForScenarios(seedScenarios, baseline, defaultAssumptions),
    []
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Internal Resource View</h1>
            <p className="text-xs text-gray-500 mt-0.5">Full staffing detail — internal use only</p>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <a href="/" className="text-gray-600 hover:text-gray-900">Dashboard</a>
            <a href="/internal" className="text-blue-600 font-medium">Internal</a>
            <a href="/external" className="text-gray-600 hover:text-gray-900">External</a>
          </nav>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-6 py-6 space-y-8">
        <Card>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Resource Roster</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 pr-4 font-medium text-gray-500">ID</th>
                  <th className="text-left py-2 pr-4 font-medium text-gray-500">Name</th>
                  <th className="text-left py-2 pr-4 font-medium text-gray-500">Role</th>
                  <th className="text-left py-2 pr-4 font-medium text-gray-500">Team</th>
                  <th className="text-left py-2 pr-4 font-medium text-gray-500">Seniority</th>
                  <th className="text-right py-2 font-medium text-gray-500">Monthly Cap (pts)</th>
                </tr>
              </thead>
              <tbody>
                {resources.filter(r => r.isActive).map(r => (
                  <tr key={r.resourceId} className="border-b border-gray-50">
                    <td className="py-1.5 pr-4 font-mono text-gray-400">{r.resourceId}</td>
                    <td className="py-1.5 pr-4 text-gray-900">{r.name}</td>
                    <td className="py-1.5 pr-4 text-gray-600">{r.role}</td>
                    <td className="py-1.5 pr-4 text-gray-600">{r.team}</td>
                    <td className="py-1.5 pr-4 text-gray-600">{r.seniorityLevel}</td>
                    <td className="text-right py-1.5 text-gray-900 font-medium">{r.monthlyCapacityPoints}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {seedScenarios.map((sc, i) => {
          const result = results[i];
          if (!result) return null;
          return (
            <InternalView key={sc.scenarioId} result={result} scenario={sc} resources={resources} />
          );
        })}
      </main>
    </div>
  );
}
