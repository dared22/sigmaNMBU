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
          'group flex cursor-pointer items-start gap-3 rounded-sm px-1 py-1.5 transition-colors',
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
          <span className="flex h-4 w-4 items-center justify-center rounded-sm border border-transparent bg-surface-container-highest transition-colors peer-checked:bg-secondary/15 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-secondary" />
          <span className="pointer-events-none absolute h-2 w-2 rounded-sm bg-secondary opacity-0 transition-opacity peer-checked:opacity-100" />
        </span>
        <span className="space-y-1">
          <span className="block font-label text-sm text-on-surface transition-colors group-hover:text-secondary">
            {label}
          </span>
          {description ? (
            <span className="block font-label text-xs leading-relaxed text-on-surface-variant">
              {description}
            </span>
          ) : null}
        </span>
      </label>
    );
  },
);

Radio.displayName = 'Radio';
