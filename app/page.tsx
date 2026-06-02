'use client';

import { useState, useMemo } from 'react';
import { resources, skillMappings, productivityWeights, currentWorkload, seedScenarios } from '@/data';
import { runForecast, runForecastForScenarios } from '@/lib/forecast/engine';
import { toExternalView } from '@/lib/forecast/redact';
import { defaultAssumptions } from '@/lib/assumptions';
import { DemandScenario, Assumptions, ForecastResult } from '@/types';

import { KpiCard } from '@/components/dashboard/KpiCard';
import { WorkloadByCaseTypeChart } from '@/components/dashboard/WorkloadByCaseTypeChart';
import { CapacityByRoleChart } from '@/components/dashboard/CapacityByRoleChart';
import { ScenarioComparisonChart } from '@/components/dashboard/ScenarioComparisonChart';
import { ScenarioList } from '@/components/scenarios/ScenarioList';
import { ScenarioForm } from '@/components/scenarios/ScenarioForm';
import { ViewToggle } from '@/components/views/ViewToggle';
import { InternalView } from '@/components/views/InternalView';
import { ExternalView } from '@/components/views/ExternalView';
import { AssumptionsPanel } from '@/components/assumptions/AssumptionsPanel';
import { Card } from '@/components/ui/Card';

const baseline = { resources, skillMappings, productivityWeights, currentWorkload };

export default function DashboardPage() {
  const [scenarios, setScenarios] = useState<DemandScenario[]>(seedScenarios);
  const [selectedId, setSelectedId] = useState<string>(seedScenarios[0].scenarioId);
  const [view, setView] = useState<'internal' | 'external'>('internal');
  const [assumptions, setAssumptions] = useState<Assumptions>(defaultAssumptions);
  const [showForm, setShowForm] = useState(false);

  const results: ForecastResult[] = useMemo(
    () => runForecastForScenarios(scenarios, baseline, assumptions),
    [scenarios, assumptions]
  );

  const selectedResult = results.find(r => r.scenarioId === selectedId);
  const selectedScenario = scenarios.find(s => s.scenarioId === selectedId);

  const externalView = useMemo(() => {
    if (!selectedResult || !selectedScenario) return null;
    const avgCapacity =
      selectedResult.horizon.reduce((sum, h) => sum + h.availableCapacityPoints, 0) /
      (selectedResult.horizon.length || 1);
    return toExternalView(selectedResult, selectedScenario, avgCapacity);
  }, [selectedResult, selectedScenario]);

  const totalActiveCases = currentWorkload.filter(c => !c.isFiled).length;
  const totalOnHold = currentWorkload.filter(c => c.isOnHold).length;
  const totalParalegals = resources.filter(r => r.role === 'Paralegal' && r.isActive).length;
  const totalAttorneys = resources.filter(r => r.role === 'Attorney' && r.isActive).length;

  function handleAddScenario(scenario: DemandScenario) {
    setScenarios(prev => [...prev, scenario]);
    setSelectedId(scenario.scenarioId);
    setShowForm(false);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Run Rate Tracker</h1>
            <p className="text-xs text-gray-500 mt-0.5">Legal Ops · Demand Planning Dashboard · Google Account</p>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <a href="/" className="text-blue-600 font-medium">Dashboard</a>
            <a href="/scenarios" className="text-gray-600 hover:text-gray-900">Scenarios</a>
            <a href="/internal" className="text-gray-600 hover:text-gray-900">Internal</a>
            <a href="/external" className="text-gray-600 hover:text-gray-900">External</a>
          </nav>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-6 py-6 space-y-6">
        {/* Global KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <KpiCard title="Active Cases" value={totalActiveCases} subtitle="Excluding filed" />
          <KpiCard title="On Hold" value={totalOnHold} subtitle="Awaiting action" />
          <KpiCard title="Paralegals" value={totalParalegals} subtitle="Active staff" />
          <KpiCard title="Attorneys" value={totalAttorneys} subtitle="Active staff" />
        </div>

        {/* Workload overview charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Active Workload by Case Type</h3>
            <WorkloadByCaseTypeChart workload={currentWorkload} />
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Capacity by Role</h3>
            <CapacityByRoleChart resources={resources} />
          </Card>
        </div>

        {/* Scenario comparison */}
        <Card>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Backlog Comparison — All Scenarios</h3>
          <ScenarioComparisonChart results={results} scenarios={scenarios} />
        </Card>

        {/* Main scenario analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-700">Scenarios</h2>
              <button
                onClick={() => setShowForm(!showForm)}
                className="text-xs text-blue-600 hover:underline"
              >
                {showForm ? 'Cancel' : '+ New'}
              </button>
            </div>
            {showForm && <ScenarioForm onSubmit={handleAddScenario} />}
            <ScenarioList
              scenarios={scenarios}
              results={results}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
            <AssumptionsPanel assumptions={assumptions} onChange={setAssumptions} />
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            {selectedResult && selectedScenario ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <ViewToggle view={view} onChange={setView} />
                </div>
                {view === 'internal' ? (
                  <InternalView result={selectedResult} scenario={selectedScenario} resources={resources} />
                ) : externalView ? (
                  <ExternalView externalView={externalView} scenario={selectedScenario} />
                ) : null}
              </div>
            ) : (
              <Card>
                <p className="text-sm text-gray-500 text-center py-8">Select a scenario to view the forecast.</p>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
