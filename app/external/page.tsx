'use client';

import { useMemo } from 'react';
import { resources, skillMappings, productivityWeights, currentWorkload, seedScenarios } from '@/data';
import { runForecastForScenarios } from '@/lib/forecast/engine';
import { toExternalView } from '@/lib/forecast/redact';
import { defaultAssumptions } from '@/lib/assumptions';
import { ExternalView } from '@/components/views/ExternalView';

const baseline = { resources, skillMappings, productivityWeights, currentWorkload };

export default function ExternalPage() {
  const results = useMemo(
    () => runForecastForScenarios(seedScenarios, baseline, defaultAssumptions),
    []
  );

  const externalViews = useMemo(() => {
    return results.map((result, i) => {
      const scenario = seedScenarios[i];
      const avgCapacity =
        result.horizon.reduce((sum, h) => sum + h.availableCapacityPoints, 0) /
        (result.horizon.length || 1);
      return toExternalView(result, scenario, avgCapacity);
    });
  }, [results]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">External / Client View</h1>
            <p className="text-xs text-gray-500 mt-0.5">Redacted — safe to share with Google</p>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <a href="/" className="text-gray-600 hover:text-gray-900">Dashboard</a>
            <a href="/internal" className="text-gray-600 hover:text-gray-900">Internal</a>
            <a href="/external" className="text-blue-600 font-medium">External</a>
          </nav>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-6 py-6 space-y-8">
        {externalViews.map((ev, i) => (
          <ExternalView key={ev.scenarioId} externalView={ev} scenario={seedScenarios[i]} />
        ))}
      </main>
    </div>
  );
}
