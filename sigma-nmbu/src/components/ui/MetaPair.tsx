import { cn } from '@/lib/cn';

interface MetaPairProps {
  label: string;
  value: string;
  className?: string;
}

export function MetaPair({ label, value, className }: MetaPairProps) {
  return (
    <div className={cn('space-y-0.5', className)}>
      <dt className="font-mono text-[10px] uppercase tracking-widest text-neutral-dim">
        {label}
      </dt>
      <dd className="font-mono text-sm text-neutral">
        {value}
      </dd>
    </div>
  );
}
