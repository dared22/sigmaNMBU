'use client';

import { cn } from '@/lib/cn';

interface TypingTextProps {
  text: string;
  className?: string;
}

export function TypingText({ text, className }: TypingTextProps) {
  return (
    <span className={cn('', className)}>
      {text}
      <span
        aria-hidden="true"
        className="ml-[0.12em] inline-block h-[1cap] w-[0.16em] animate-caret rounded-[1px] bg-secondary align-baseline"
      />
    </span>
  );
}
