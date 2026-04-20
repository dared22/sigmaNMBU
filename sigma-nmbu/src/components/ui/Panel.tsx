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
        'rounded-xl bg-bg-raised/90 ghost-border shadow-[0_18px_48px_rgb(0_0_0_/_0.18)] backdrop-blur-sm',
        stripe && `border-l-2 ${stripeColors[stripe]}`,
        className,
      )}
    >
      {children}
    </div>
  );
}
