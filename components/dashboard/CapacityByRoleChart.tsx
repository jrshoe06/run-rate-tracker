'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ResourceCapacity } from '@/types';

interface Props {
  resources: ResourceCapacity[];
}

const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#6366f1', '#ec4899'];

export function CapacityByRoleChart({ resources }: Props) {
  const roleCapacity: Record<string, number> = {};
  for (const r of resources) {
    if (r.isActive) {
      roleCapacity[r.role] = (roleCapacity[r.role] ?? 0) + r.monthlyCapacityPoints;
    }
  }

  const data = Object.entries(roleCapacity).map(([role, capacity]) => ({ role, capacity }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="capacity"
          nameKey="role"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={({ role, percent }) => `${role} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
