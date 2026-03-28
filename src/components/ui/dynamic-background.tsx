'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface BlobProps {
  color: string;
  size: string;
  top: string;
  left: string;
  delay?: number;
  duration?: number;
}

function Blob({ color, size, top, left, delay = 0, duration = 8 }: BlobProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="absolute rounded-full blur-[120px] opacity-[0.08]"
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        top,
        left,
      }}
      animate={shouldReduceMotion ? {} : {
        x: [0, 30, -20, 0],
        y: [0, -20, 30, 0],
        scale: [1, 1.1, 0.9, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
}

interface DynamicBackgroundProps {
  variant?: 'hero' | 'services' | 'case-studies' | 'advantage' | 'contact';
}

export function DynamicBackground({ variant = 'hero' }: DynamicBackgroundProps) {
  const configs = {
    hero: [
      { color: '#2563EB', size: '40vw', top: '15%', left: '10%', delay: 0, duration: 8 },
      { color: '#7C3AED', size: '35vw', top: '40%', left: '60%', delay: 2, duration: 10 },
      { color: '#F59E0B', size: '30vw', top: '70%', left: '20%', delay: 4, duration: 12 },
    ],
    services: [
      { color: '#3B82F6', size: '30vw', top: '10%', left: '5%', delay: 0, duration: 10 },
      { color: '#06B6D4', size: '25vw', top: '50%', left: '70%', delay: 3, duration: 12 },
    ],
    'case-studies': [
      { color: '#8B5CF6', size: '35vw', top: '20%', left: '60%', delay: 1, duration: 9 },
      { color: '#D946EF', size: '30vw', top: '60%', left: '10%', delay: 4, duration: 11 },
    ],
    advantage: [
      { color: '#FBBF24', size: '30vw', top: '30%', left: '10%', delay: 0, duration: 8 },
      { color: '#F59E0B', size: '25vw', top: '10%', left: '70%', delay: 2, duration: 10 },
    ],
    contact: [
      { color: '#1E293B', size: '40vw', top: '20%', left: '50%', delay: 0, duration: 15 },
    ],
  };

  const blobs = configs[variant] || configs.hero;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {blobs.map((blob, i) => (
        <Blob key={i} {...blob} />
      ))}
      
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
}
