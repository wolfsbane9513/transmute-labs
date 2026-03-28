'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function SecureCore() {
  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none opacity-50">
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shield Outer */}
        <motion.path
          d="M100 20 L160 45 V100 C160 140 135 175 100 185 C65 175 40 140 40 100 V45 L100 20 Z"
          stroke="#FBBF24" strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
        
        {/* Inner Bit Flow */}
        {[0, 1, 2].map((i) => (
          <motion.rect
            key={i}
            x="80" y={70 + i * 25} width="40" height="2"
            fill="#FBBF24"
            animate={{ opacity: [0, 1, 0], x: [80, 100, 80] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}

        {/* Concentric Rings */}
        <motion.circle
          cx="100" cy="100" r="30"
          stroke="#FBBF24" strokeWidth="1" strokeDasharray="2 2"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
      </svg>
    </div>
  );
}
