import { cn } from '@/lib/utils';
import { RiskStatus } from '@/types';

interface BadgeProps {
  status: RiskStatus;
  className?: string;
}

export function RiskBadge({ status, className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', {
      'bg-green-100 text-green-800': status === 'On Track',
      'bg-amber-100 text-amber-800': status === 'At Risk',
      'bg-red-100 text-red-800': status === 'Capacity Constrained',
    }, className)}>
      {status}
    </span>
  );
}
