'use client';

import { ExternalForecastView, DemandScenario } from '@/types';
import { Card } from '@/components/ui/Card';
import { RiskBadge } from '@/components/ui/Badge';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { BacklogChart } from '@/components/dashboard/BacklogChart';
import { formatMonth } from '@/lib/utils';

interface Props {
  externalView: ExternalForecastView;
  scenario: DemandScenario;
}

export function ExternalView({ externalView, scenario }: Props) {
  // Convert ExternalForecastView's backlog trend to MonthlyForecastPoint shape for BacklogChart
  const chartData = externalView.monthlyBacklogTrend.map(t => ({
    month: t.month,
    availableCapacityPoints: 0,
    demandPoints: 0,
    netCapacityPoints: 0,
    newBacklogPoints: 0,
    carriedBacklogPoints: 0,
    endingBacklogPoints: t.backlogPoints,
    riskStatus: externalView.riskStatus,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{scenario.scenarioName}</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Client View · {scenario.caseType} · {externalView.projectedVolume.toLocaleString()} cases
          </p>
        </div>
        <RiskBadge status={externalView.riskStatus} />
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
        This is an external/client-facing view. Internal resource and staffing details have been redacted.
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KpiCard title="Projected Volume" value={externalView.projectedVolume.toLocaleString()} subtitle="Total cases" />
        <KpiCard title="Capacity Band" value={externalView.capacityBand} subtitle="Current level" />
        <KpiCard title="Throughput / Month" value={`~${externalView.expectedThroughputPerMonth}`} subtitle="Estimated cases/mo" />
        <KpiCard
          title="Est. Completion"
          value={externalView.estimatedCompletionWindow ? formatMonth(externalView.estimatedCompletionWindow) : 'TBD'}
          subtitle="Clearance window"
        />
      </div>

      <Card>
        <h3 className="text-sm font-semibold text-gray-700 mb-1">Summary</h3>
        <p className="text-sm text-gray-600">{externalView.recommendedAction}</p>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Backlog Trend</h3>
        <BacklogChart data={chartData} />
      </Card>
    </div>
  );
}
