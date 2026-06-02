'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import { MonthlyForecastPoint } from '@/types';
import { formatMonth } from '@/lib/utils';

interface Props {
  data: MonthlyForecastPoint[];
}

export function StaffingGapChart({ data }: Props) {
  const chartData = data.map(d => ({
    month: formatMonth(d.month),
    gap: Math.round(d.netCapacityPoints),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip />
        <Legend />
        <ReferenceLine y={0} stroke="#6b7280" strokeDasharray="4 4" />
        <Bar
          dataKey="gap"
          name="Net Capacity (positive = surplus)"
          fill="#3b82f6"
          // Color bars red if negative
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
