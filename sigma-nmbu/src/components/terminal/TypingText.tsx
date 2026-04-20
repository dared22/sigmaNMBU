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
      <span className="animate-caret text-accent-primary">▌</span>
    </span>
  );
}
