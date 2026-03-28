'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore, getLevel } from '@/lib/game-store';

export function XPBar() {
  const xp = useGameStore((s) => s.xp);
  const level = getLevel(xp);
  const xpInLevel = xp % 100;
  const progress = Math.min(100, xpInLevel);

  if (xp === 0) return null;

  return (
    <div className="flex items-center gap-2 px-4 pb-2">
      <span className="text-[10px] font-mono text-amber-400/70 whitespace-nowrap">
        LVL {level}
      </span>
      <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-amber-400/60 to-amber-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      <span className="text-[10px] font-mono text-text-muted whitespace-nowrap">
        {xp} XP
      </span>
    </div>
  );
}
