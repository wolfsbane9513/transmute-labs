'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function ProcessMap() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
      <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.circle
          cx="100" cy="150" r="4" fill="#FBBF24"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.circle
          cx="200" cy="100" r="4" fill="#FBBF24"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        <motion.circle
          cx="200" cy="200" r="4" fill="#FBBF24"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
        <motion.circle
          cx="300" cy="150" r="4" fill="#FBBF24"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        />

        <motion.path
          d="M100 150 L200 100 M100 150 L200 200 M200 100 L300 150 M200 200 L300 150"
          stroke="#FBBF24"
          strokeWidth="1"
          strokeDasharray="4 4"
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
      </svg>
    </div>
  );
}
