'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export function TypingText({ text, speed = 40, className, onComplete }: TypingTextProps) {
  const [displayedLength, setDisplayedLength] = useState(0);
  const hasTyped = useRef(false);

  useEffect(() => {
    if (hasTyped.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplayedLength(text.length);
      onComplete?.();
      hasTyped.current = true;
      return;
    }

    const key = `sigma-typed-${text.slice(0, 20)}`;
    if (sessionStorage.getItem(key)) {
      setDisplayedLength(text.length);
      onComplete?.();
      hasTyped.current = true;
      return;
    }

    hasTyped.current = true;
    let i = 0;
    const step = () => {
      if (i < text.length) {
        i++;
        setDisplayedLength(i);
        requestAnimationFrame(() => setTimeout(step, speed));
      } else {
        sessionStorage.setItem(key, '1');
        onComplete?.();
      }
    };
    step();
  }, [text, speed, onComplete]);

  return (
    <span className={cn('', className)}>
      {text.slice(0, displayedLength)}
      {displayedLength < text.length && (
        <span className="animate-caret text-accent-primary">▌</span>
      )}
    </span>
  );
}
