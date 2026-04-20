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
            className="block font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-muted"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <span className="absolute left-3 top-3 font-mono text-sm text-accent-primary animate-caret">
            &gt;
          </span>
          <textarea
            ref={ref}
            id={id}
            className={cn(
              'min-h-[100px] w-full resize-y rounded-[4px] bg-bg-deep px-3 py-2.5 pl-7 font-mono text-sm text-neutral ghost-border',
              'placeholder:text-neutral-dim focus:outline-none focus:ring-2 focus:ring-accent-primary/70',
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
