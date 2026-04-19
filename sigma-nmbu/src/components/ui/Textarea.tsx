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
          <label htmlFor={id} className="block font-mono text-xs uppercase tracking-wide text-neutral-muted">
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
              'w-full rounded-lg bg-bg-deep pl-7 pr-3 py-2.5 font-mono text-sm text-neutral ghost-border',
              'placeholder:text-neutral-dim focus:outline-none focus:ring-2 focus:ring-accent-primary min-h-[100px] resize-y',
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
