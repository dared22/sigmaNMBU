import { cn } from '@/lib/cn';

type StatusDotVariant = 'ok' | 'warn' | 'err';

const dotColors: Record<StatusDotVariant, string> = {
  ok: 'bg-status-ok',
  warn: 'bg-status-warn',
  err: 'bg-status-err',
};

interface StatusDotProps {
  status?: StatusDotVariant;
  pulse?: boolean;
  className?: string;
}

export function StatusDot({ status = 'ok', pulse = true, className }: StatusDotProps) {
  return (
    <span
      className={cn(
        'inline-block h-2 w-2 rounded-full',
        dotColors[status],
        pulse && 'animate-pulse-dot',
        className,
      )}
      aria-hidden="true"
    />
  );
}
