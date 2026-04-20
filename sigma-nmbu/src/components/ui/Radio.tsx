'use client';

import { cn } from '@/lib/cn';
import { type InputHTMLAttributes, forwardRef } from 'react';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, description, id, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={cn(
          'group flex cursor-pointer items-start gap-3 rounded-lg border border-transparent',
          'px-2 py-2 transition-colors hover:border-line hover:bg-white/5',
          className,
        )}
      >
        <span className="relative mt-0.5 flex h-4 w-4 items-center justify-center">
          <input
            ref={ref}
            id={id}
            type="radio"
            className="peer sr-only"
            {...props}
          />
          <span className="flex h-4 w-4 items-center justify-center rounded-full border border-line bg-bg-deep transition-colors peer-checked:border-accent-primary peer-checked:bg-accent-primary/10 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-primary" />
          <span className="pointer-events-none absolute h-2 w-2 rounded-full bg-accent-primary opacity-0 transition-opacity peer-checked:opacity-100" />
        </span>
        <span className="space-y-1">
          <span className="block font-mono text-xs uppercase tracking-[0.2em] text-neutral-muted transition-colors group-hover:text-neutral">
            {label}
          </span>
          {description ? (
            <span className="block font-mono text-xs leading-relaxed text-neutral-dim">
              {description}
            </span>
          ) : null}
        </span>
      </label>
    );
  },
);

Radio.displayName = 'Radio';
