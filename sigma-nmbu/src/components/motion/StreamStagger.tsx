'use client';

import { motion } from 'framer-motion';
import { Children } from 'react';

interface StreamStaggerProps {
  children: React.ReactNode;
  stagger?: number;
  className?: string;
}

export function StreamStagger({ children, stagger = 0.06, className }: StreamStaggerProps) {
  return (
    <div className={className}>
      {Children.map(children, (child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.42,
            delay: i * stagger,
            ease: [0.2, 0.7, 0.2, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
