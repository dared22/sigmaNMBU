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
        className="ml-[0.12em] inline-block h-[0.82em] w-[0.16em] translate-y-[0.06em] animate-caret rounded-[1px] bg-secondary align-baseline"
      />
    </span>
  );
}
