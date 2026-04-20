import { cn } from '@/lib/cn';

interface PanelProps {
  children: React.ReactNode;
  className?: string;
  stripe?: 'primary' | 'secondary' | 'warn' | 'err';
}

const stripeColors: Record<string, string> = {
  primary: 'border-l-secondary',
  secondary: 'border-l-tertiary',
  warn: 'border-l-tertiary',
  err: 'border-l-error',
};

export function Panel({ children, className, stripe }: PanelProps) {
  return (
    <div
      className={cn(
        'rounded-sm border border-outline-variant/15 bg-surface-container shadow-[0_4px_40px_rgb(0_0_0_/_0.32)]',
        stripe && `border-l-2 ${stripeColors[stripe]}`,
        className,
      )}
    >
      {children}
    </div>
  );
}
