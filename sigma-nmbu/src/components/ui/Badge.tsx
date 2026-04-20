import { cn } from '@/lib/cn';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'status';

const variants: Record<BadgeVariant, string> = {
  default: 'bg-white/5 text-neutral-muted',
  primary: 'bg-accent-primary/10 text-accent-primary',
  secondary: 'bg-accent-secondary/10 text-accent-secondary',
  status: 'bg-status-ok/10 text-status-ok',
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em]',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
