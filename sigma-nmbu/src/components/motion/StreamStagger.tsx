'use client';

import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { Children } from 'react';
import { useEffect, useState } from 'react';

interface StreamStaggerProps {
  children: React.ReactNode;
  stagger?: number;
  className?: string;
}

export function StreamStagger({ children, stagger = 0.06, className }: StreamStaggerProps) {
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
    <div className={className}>
      {Children.map(children, (child, i) => (
        <div
          key={i}
          style={
            !reduceMotion && isAnimated
              ? { animationDelay: `${i * stagger}s` }
              : undefined
          }
          className={cn(!reduceMotion && isAnimated && 'animate-stream-in')}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
