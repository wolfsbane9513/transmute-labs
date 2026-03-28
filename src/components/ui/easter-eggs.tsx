'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/lib/game-store';

// Konami code: up up down down left right left right b a
const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA',
];

function Particle({ delay }: { delay: number }) {
  const x = Math.random() * 100;
  const hue = Math.random() * 360;
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{
        left: `${x}%`,
        bottom: 0,
        backgroundColor: `hsl(${hue}, 80%, 60%)`,
      }}
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: -(200 + Math.random() * 400),
        x: (Math.random() - 0.5) * 200,
        opacity: 0,
        scale: [1, 1.5, 0],
      }}
      transition={{
        duration: 1.5 + Math.random(),
        delay,
        ease: 'easeOut',
      }}
    />
  );
}

export function EasterEggs() {
  const keysRef = useRef<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const trackEasterEgg = useGameStore((s) => s.trackEasterEgg);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current.push(e.code);
      if (keysRef.current.length > KONAMI.length) {
        keysRef.current.shift();
      }

      if (keysRef.current.length === KONAMI.length &&
          keysRef.current.every((k, i) => k === KONAMI[i])) {
        keysRef.current = [];
        trackEasterEgg('konami');
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [trackEasterEgg]);

  return (
    <AnimatePresence>
      {showConfetti && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9997] pointer-events-none overflow-hidden"
        >
          {Array.from({ length: 40 }).map((_, i) => (
            <Particle key={i} delay={i * 0.05} />
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
          >
            <p className="text-2xl font-bold text-gradient">Secret Found!</p>
            <p className="text-sm text-text-secondary mt-1">+25 XP</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
