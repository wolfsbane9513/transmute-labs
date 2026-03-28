'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function NeuralEngine() {
  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center pointer-events-none opacity-40">
      <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Central Core */}
        <motion.circle
          cx="200" cy="200" r="40"
          stroke="#FBBF24" strokeWidth="2"
          animate={{ r: [40, 45, 40], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="200" cy="200" r="60"
          stroke="#FBBF24" strokeWidth="1" strokeDasharray="4 4"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        {/* Outer Rings */}
        {[80, 120, 160].map((r, i) => (
          <motion.circle
            key={r}
            cx="200" cy="200" r={r}
            stroke="#FBBF24" strokeWidth="0.5"
            opacity={0.2 - i * 0.05}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
          />
        ))}

        {/* Nodes and Connections */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const x = 200 + 120 * Math.cos((angle * Math.PI) / 180);
          const y = 200 + 120 * Math.sin((angle * Math.PI) / 180);
          return (
            <React.Fragment key={i}>
              <motion.line
                x1="200" y1="200" x2={x} y2={y}
                stroke="#FBBF24" strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, repeatDelay: 5 }}
              />
              <motion.circle
                cx={x} cy={y} r="4"
                fill="#FBBF24"
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
              />
            </React.Fragment>
          );
        })}
      </svg>
      
      {/* Background glow */}
      <div className="absolute inset-0 bg-radial-gradient from-amber-500/10 to-transparent blur-3xl rounded-full" />
    </div>
  );
}
