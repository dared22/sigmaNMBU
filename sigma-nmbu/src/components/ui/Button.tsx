'use client';

import { cn } from '@/lib/cn';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'ghost' | 'terminal' | 'glitch';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'border border-accent-primary/50 bg-accent-primary/95 text-bg shadow-glow transition-all duration-150 hover:-translate-y-px hover:shadow-glow-lg',
  ghost:
    'ghost-border bg-white/[0.02] text-neutral transition-all duration-150 hover:border-line-strong hover:bg-white/7',
  terminal:
    'ghost-border bg-black/25 text-neutral transition-all duration-150 hover:bg-bg-raised/80',
  glitch:
    'border border-accent-primary/50 bg-accent-primary/95 text-bg transition-all duration-150 data-[state=pressed]:animate-glitch hover:-translate-y-px hover:shadow-glow-md',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-[4px] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.24em] disabled:cursor-not-allowed disabled:opacity-45',
          variants[variant],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
