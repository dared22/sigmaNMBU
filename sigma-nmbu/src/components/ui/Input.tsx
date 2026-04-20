'use client';

import { cn } from '@/lib/cn';
import { type InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={id}
            className="block font-label text-[11px] uppercase tracking-[0.24em] text-on-surface-variant"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-label text-sm text-secondary animate-caret">
            &gt;
          </span>
          <input
            ref={ref}
            id={id}
            className={cn(
              'w-full rounded-sm border border-outline-variant/60 bg-surface-container-lowest px-3 py-2.5 pl-7 font-label text-sm text-on-surface',
              'placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-secondary/70',
              className,
            )}
            {...props}
          />
        </div>
      </div>
    );
  },
);

Input.displayName = 'Input';
