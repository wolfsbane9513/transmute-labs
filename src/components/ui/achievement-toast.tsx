'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { useGameStore } from '@/lib/game-store';

export function AchievementToast() {
  const pendingToast = useGameStore((s) => s.pendingToast);
  const dismissToast = useGameStore((s) => s.dismissToast);

  useEffect(() => {
    if (!pendingToast) return;
    const timer = setTimeout(dismissToast, 4000);
    return () => clearTimeout(timer);
  }, [pendingToast, dismissToast]);

  return (
    <AnimatePresence>
      {pendingToast && (
        <motion.div
          initial={{ y: -80, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -80, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-auto"
        >
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400/10 to-amber-400/5 backdrop-blur-xl border border-amber-400/20 shadow-lg shadow-amber-400/5">
            <div className="w-10 h-10 rounded-xl bg-amber-400/15 flex items-center justify-center flex-shrink-0">
              <Trophy className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-400">{pendingToast.name}</p>
              <p className="text-xs text-text-secondary">{pendingToast.description}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
