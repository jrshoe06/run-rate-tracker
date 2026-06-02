import { cn } from '@/lib/utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={cn('bg-white rounded-lg shadow-sm border border-gray-100 p-4', className)}>
      {children}
    </div>
  );
}
