'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.42, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className={cn('', className)}
    >
      {children}
    </motion.div>
  );
}
