'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { MonthlyForecastPoint } from '@/types';
import { formatMonth } from '@/lib/utils';

interface Props {
  data: MonthlyForecastPoint[];
}

export function BacklogChart({ data }: Props) {
  const chartData = data.map(d => ({
    month: formatMonth(d.month),
    backlog: Math.round(d.endingBacklogPoints),
    newBacklog: Math.round(d.newBacklogPoints),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="backlogGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f87171" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f87171" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="backlog"
          name="Ending Backlog"
          stroke="#ef4444"
          fill="url(#backlogGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
