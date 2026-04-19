'use client';

import { cn } from '@/lib/cn';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'ghost' | 'terminal' | 'glitch';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-accent-primary text-bg font-mono font-bold uppercase tracking-wide shadow-glow hover:shadow-glow-lg transition-all duration-120',
  ghost:
    'ghost-border text-neutral font-mono uppercase tracking-wide hover:bg-white/5 transition-all duration-120',
  terminal:
    'bg-bg-deep text-neutral font-mono ghost-border hover:bg-bg-raised transition-all duration-120',
  glitch:
    'bg-accent-primary text-bg font-mono font-bold uppercase tracking-wide data-[state=pressed]:animate-glitch transition-all duration-120',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm',
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
