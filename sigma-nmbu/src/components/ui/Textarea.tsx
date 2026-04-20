'use client';

import { cn } from '@/lib/cn';
import { type TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
          <span className="absolute left-3 top-3 font-label text-sm text-secondary animate-caret">
            &gt;
          </span>
          <textarea
            ref={ref}
            id={id}
            className={cn(
              'min-h-[100px] w-full resize-y rounded-sm border border-outline-variant/60 bg-surface-container-lowest px-3 py-2.5 pl-7 font-label text-sm text-on-surface',
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

Textarea.displayName = 'Textarea';
