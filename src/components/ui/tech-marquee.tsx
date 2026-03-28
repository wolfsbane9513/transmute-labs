'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { technologies } from '@/lib/constants';

export function TechMarquee() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(1000);

  useEffect(() => {
    if (contentRef.current) {
      // Measure one copy of the content (total / 3 copies)
      setContentWidth(contentRef.current.scrollWidth / 3);
    }
  }, []);

  return (
    <div className="relative py-10 overflow-hidden bg-deep/50 backdrop-blur-sm border-y border-white/[0.04]">
      <div className="flex whitespace-nowrap">
        <motion.div
          ref={contentRef}
          className="flex space-x-12 items-center"
          animate={{ x: [0, -contentWidth] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
        >
          {[...technologies, ...technologies, ...technologies].map((tech, i) => (
            <span
              key={i}
              className="text-lg md:text-xl font-mono text-text-muted hover:text-accent-amber transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Gradients for smooth fade out at edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-deep to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-deep to-transparent z-10" />
    </div>
  );
}
