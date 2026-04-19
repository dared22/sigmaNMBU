import { cn } from '@/lib/cn';

interface PanelProps {
  children: React.ReactNode;
  className?: string;
  stripe?: 'primary' | 'secondary' | 'warn' | 'err';
}

const stripeColors: Record<string, string> = {
  primary: 'border-l-accent-primary',
  secondary: 'border-l-accent-secondary',
  warn: 'border-l-status-warn',
  err: 'border-l-status-err',
};

export function Panel({ children, className, stripe }: PanelProps) {
  return (
    <div
      className={cn(
        'rounded-lg bg-bg-raised ghost-border',
        stripe && `border-l-2 ${stripeColors[stripe]}`,
        className,
      )}
    >
      {children}
    </div>
  );
}
