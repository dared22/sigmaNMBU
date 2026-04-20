'use client';

import { cn } from '@/lib/cn';
import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    const timeoutId = window.setTimeout(() => {
      setIsAnimated(true);
    }, 20);

    return () => window.clearTimeout(timeoutId);
  }, [reduceMotion]);

  return (
    <div
      style={!reduceMotion && isAnimated ? { animationDelay: `${delay}s` } : undefined}
      className={cn(!reduceMotion && isAnimated && 'animate-stream-in', className)}
    >
      {children}
    </div>
  );
}
