import { cn } from '@/lib/cn';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'status';

const variants: Record<BadgeVariant, string> = {
  default: 'border-outline-variant/20 bg-surface-container-highest text-primary',
  primary: 'border-secondary/20 bg-secondary/10 text-secondary',
  secondary: 'border-tertiary/20 bg-tertiary/10 text-tertiary',
  status: 'border-secondary/20 bg-surface-container-highest text-secondary',
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
        'inline-flex items-center rounded-sm border px-2.5 py-1 font-label text-[10px] uppercase tracking-[0.22em]',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
