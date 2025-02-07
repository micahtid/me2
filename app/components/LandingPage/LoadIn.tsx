'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface LoadInProps {
  children: React.ReactNode;
  className?: string;
}

const LoadIn = ({ children, className }: LoadInProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -100px 0px"
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.7,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default LoadIn;