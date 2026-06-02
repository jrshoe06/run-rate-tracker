'use client';

import { useState, useMemo } from 'react';
import { resources, skillMappings, productivityWeights, currentWorkload, seedScenarios } from '@/data';
import { runForecastForScenarios } from '@/lib/forecast/engine';
import { defaultAssumptions } from '@/lib/assumptions';
import { DemandScenario, Assumptions, ForecastResult } from '@/types';
import { ScenarioForm } from '@/components/scenarios/ScenarioForm';
import { ScenarioList } from '@/components/scenarios/ScenarioList';
import { Card } from '@/components/ui/Card';
import { RiskBadge } from '@/components/ui/Badge';

const baseline = { resources, skillMappings, productivityWeights, currentWorkload };

export default function ScenariosPage() {
  const [scenarios, setScenarios] = useState<DemandScenario[]>(seedScenarios);
  const [selectedId, setSelectedId] = useState<string>(seedScenarios[0].scenarioId);
  const [assumptions] = useState<Assumptions>(defaultAssumptions);

  const results: ForecastResult[] = useMemo(
    () => runForecastForScenarios(scenarios, baseline, assumptions),
    [scenarios, assumptions]
  );

  const selectedResult = results.find(r => r.scenarioId === selectedId);
  const selectedScenario = scenarios.find(s => s.scenarioId === selectedId);

  function handleAddScenario(scenario: DemandScenario) {
    setScenarios(prev => [...prev, scenario]);
    setSelectedId(scenario.scenarioId);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Scenarios</h1>
            <p className="text-xs text-gray-500 mt-0.5">Manage and compare demand scenarios</p>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <a href="/" className="text-gray-600 hover:text-gray-900">Dashboard</a>
            <a href="/scenarios" className="text-blue-600 font-medium">Scenarios</a>
          </nav>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <ScenarioForm onSubmit={handleAddScenario} />
            <ScenarioList
              scenarios={scenarios}
              results={results}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>

          <div className="lg:col-span-2">
            {selectedResult && selectedScenario ? (
              <Card>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{selectedScenario.scenarioName}</h2>
                    <p className="text-sm text-gray-500">{selectedScenario.caseType} · {selectedScenario.projectedVolume.toLocaleString()} cases</p>
                  </div>
                  <RiskBadge status={selectedResult.overallRiskStatus} />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Peak Backlog</p>
                    <p className="text-xl font-bold text-gray-900">{Math.round(selectedResult.totalBacklogPeakPoints).toLocaleString()}</p>
                    <p className="text-xs text-gray-400">points</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Additional FTEs</p>
                    <p className="text-xl font-bold text-gray-900">{selectedResult.requiredAdditionalFTE}</p>
                    <p className="text-xs text-gray-400">needed to clear backlog</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Recommended Action</p>
                  <p className="text-sm text-gray-700">{selectedResult.recommendedAction}</p>
                </div>

                {selectedScenario.notes && (
                  <p className="text-xs text-gray-400 italic border-t pt-3">{selectedScenario.notes}</p>
                )}

                <div className="mt-4">
                  <p className="text-xs font-medium text-gray-500 mb-2">Monthly Overview</p>
                  <div className="space-y-1">
                    {selectedResult.horizon.slice(0, 6).map(h => (
                      <div key={h.month} className="flex items-center justify-between text-xs">
                        <span className="font-mono text-gray-600">{h.month}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-500">Cap: {Math.round(h.availableCapacityPoints)}</span>
                          <span className="text-gray-500">Demand: {Math.round(h.demandPoints)}</span>
                          <RiskBadge status={h.riskStatus} />
                        </div>
                      </div>
                    ))}
                    {selectedResult.horizon.length > 6 && (
                      <p className="text-xs text-gray-400 text-center pt-1">
                        + {selectedResult.horizon.length - 6} more months · <a href="/" className="text-blue-500 hover:underline">View full dashboard</a>
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ) : (
              <Card>
                <p className="text-sm text-gray-500 text-center py-8">Select a scenario to view details.</p>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
