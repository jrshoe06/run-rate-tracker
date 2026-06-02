'use client';

import { DemandScenario, ForecastResult } from '@/types';
import { Card } from '@/components/ui/Card';
import { RiskBadge } from '@/components/ui/Badge';

interface Props {
  scenarios: DemandScenario[];
  results: ForecastResult[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ScenarioList({ scenarios, results, selectedId, onSelect }: Props) {
  return (
    <div className="space-y-2">
      {scenarios.map(sc => {
        const result = results.find(r => r.scenarioId === sc.scenarioId);
        return (
          <button
            key={sc.scenarioId}
            onClick={() => onSelect(sc.scenarioId)}
            className={`w-full text-left p-3 rounded-lg border transition-colors ${
              selectedId === sc.scenarioId
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{sc.scenarioName}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {sc.projectedVolume.toLocaleString()} {sc.caseType} cases · {sc.projectedStartMonth} → {sc.targetCompletionMonth}
                </p>
              </div>
              {result && <RiskBadge status={result.overallRiskStatus} className="shrink-0" />}
            </div>
            {result && result.totalBacklogPeakPoints > 0 && (
              <p className="text-xs text-red-600 mt-1">
                Peak backlog: {Math.round(result.totalBacklogPeakPoints)} pts · +{result.requiredAdditionalFTE} FTE needed
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}
