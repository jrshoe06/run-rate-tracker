'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { CurrentWorkloadItem, CaseType } from '@/types';

interface Props {
  workload: CurrentWorkloadItem[];
}

const COLORS: Record<CaseType, string> = {
  'H-1B': '#3b82f6',
  'H-1B Extension': '#6366f1',
  'Change of Employer': '#8b5cf6',
  'PERM': '#f59e0b',
  'AOS': '#10b981',
  'Amendment': '#f97316',
  'CAP': '#ec4899',
};

export function WorkloadByCaseTypeChart({ workload }: Props) {
  const counts: Record<string, number> = {};
  for (const item of workload) {
    if (!item.isFiled) {
      counts[item.caseType] = (counts[item.caseType] ?? 0) + 1;
    }
  }

  const data = Object.entries(counts).map(([caseType, count]) => ({ caseType, count }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="caseType" tick={{ fontSize: 10 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip />
        <Bar dataKey="count" name="Active Cases">
          {data.map((entry) => (
            <Cell key={entry.caseType} fill={COLORS[entry.caseType as CaseType] ?? '#94a3b8'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
