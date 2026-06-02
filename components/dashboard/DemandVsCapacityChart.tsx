'use client';

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { MonthlyForecastPoint } from '@/types';
import { formatMonth } from '@/lib/utils';

interface Props {
  data: MonthlyForecastPoint[];
}

export function DemandVsCapacityChart({ data }: Props) {
  const chartData = data.map(d => ({
    month: formatMonth(d.month),
    capacity: Math.round(d.availableCapacityPoints),
    demand: Math.round(d.demandPoints),
    net: Math.round(d.netCapacityPoints),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="capacity" name="Available Capacity" fill="#86efac" />
        <Bar dataKey="demand" name="Demand" fill="#fca5a5" />
        <Line type="monotone" dataKey="net" name="Net Capacity" stroke="#3b82f6" strokeWidth={2} dot={false} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
