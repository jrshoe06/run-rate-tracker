'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ForecastResult, DemandScenario } from '@/types';
import { formatMonth } from '@/lib/utils';

interface Props {
  results: ForecastResult[];
  scenarios: DemandScenario[];
}

const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444'];

export function ScenarioComparisonChart({ results, scenarios }: Props) {
  const allMonths = results[0]?.horizon.map(h => h.month) ?? [];

  const chartData = allMonths.map(month => {
    const row: Record<string, string | number> = { month: formatMonth(month) };
    for (const result of results) {
      const sc = scenarios.find(s => s.scenarioId === result.scenarioId);
      const point = result.horizon.find(h => h.month === month);
      if (sc && point) {
        row[sc.scenarioName] = Math.round(point.endingBacklogPoints);
      }
    }
    return row;
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip />
        <Legend />
        {scenarios.map((sc, i) => (
          <Line
            key={sc.scenarioId}
            type="monotone"
            dataKey={sc.scenarioName}
            stroke={COLORS[i % COLORS.length]}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
