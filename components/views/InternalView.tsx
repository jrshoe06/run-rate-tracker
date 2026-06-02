'use client';

import { ForecastResult, DemandScenario, ResourceCapacity } from '@/types';
import { Card } from '@/components/ui/Card';
import { RiskBadge } from '@/components/ui/Badge';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { DemandVsCapacityChart } from '@/components/dashboard/DemandVsCapacityChart';
import { BacklogChart } from '@/components/dashboard/BacklogChart';
import { StaffingGapChart } from '@/components/dashboard/StaffingGapChart';
import { formatNumber } from '@/lib/utils';

interface Props {
  result: ForecastResult;
  scenario: DemandScenario;
  resources: ResourceCapacity[];
}

export function InternalView({ result, scenario, resources }: Props) {
  const activeParalegals = resources.filter(r => r.role === 'Paralegal' && r.isActive).length;
  const activeAttorneys = resources.filter(r => r.role === 'Attorney' && r.isActive).length;
  const totalCapacity = resources.filter(r => r.isActive).reduce((sum, r) => sum + r.monthlyCapacityPoints, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{scenario.scenarioName}</h2>
          <p className="text-sm text-gray-500 mt-0.5">{scenario.caseType} · {scenario.projectedVolume.toLocaleString()} cases · {scenario.projectedStartMonth} → {scenario.targetCompletionMonth}</p>
        </div>
        <RiskBadge status={result.overallRiskStatus} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KpiCard title="Active Paralegals" value={activeParalegals} subtitle="Eligible staff" />
        <KpiCard title="Active Attorneys" value={activeAttorneys} subtitle="Eligible staff" />
        <KpiCard title="Total Monthly Capacity" value={`${totalCapacity.toLocaleString()} pts`} subtitle="All active resources" />
        <KpiCard title="Additional FTEs Needed" value={result.requiredAdditionalFTE} subtitle={result.estimatedClearanceMonth ? `Clears ${result.estimatedClearanceMonth}` : 'Does not clear in horizon'} />
      </div>

      <Card>
        <h3 className="text-sm font-semibold text-gray-700 mb-1">Recommended Action</h3>
        <p className="text-sm text-gray-600">{result.recommendedAction}</p>
        {scenario.notes && (
          <p className="text-xs text-gray-400 mt-2 italic">{scenario.notes}</p>
        )}
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Demand vs Capacity</h3>
        <DemandVsCapacityChart data={result.horizon} />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Backlog Trend</h3>
          <BacklogChart data={result.horizon} />
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Net Capacity Gap</h3>
          <StaffingGapChart data={result.horizon} />
        </Card>
      </div>

      <Card>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Monthly Forecast Detail</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 pr-4 font-medium text-gray-500">Month</th>
                <th className="text-right py-2 pr-4 font-medium text-gray-500">Available</th>
                <th className="text-right py-2 pr-4 font-medium text-gray-500">Demand</th>
                <th className="text-right py-2 pr-4 font-medium text-gray-500">Net</th>
                <th className="text-right py-2 pr-4 font-medium text-gray-500">Backlog</th>
                <th className="text-right py-2 font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {result.horizon.map(row => (
                <tr key={row.month} className="border-b border-gray-50">
                  <td className="py-1.5 pr-4 font-mono text-gray-700">{row.month}</td>
                  <td className="text-right py-1.5 pr-4 text-gray-600">{formatNumber(row.availableCapacityPoints, 0)}</td>
                  <td className="text-right py-1.5 pr-4 text-gray-600">{formatNumber(row.demandPoints, 0)}</td>
                  <td className={`text-right py-1.5 pr-4 ${row.netCapacityPoints < 0 ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                    {formatNumber(row.netCapacityPoints, 0)}
                  </td>
                  <td className={`text-right py-1.5 pr-4 ${row.endingBacklogPoints > 0 ? 'text-red-600 font-medium' : 'text-gray-400'}`}>
                    {formatNumber(row.endingBacklogPoints, 0)}
                  </td>
                  <td className="text-right py-1.5">
                    <RiskBadge status={row.riskStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
