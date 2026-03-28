'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { avatarQuips } from '@/lib/chat-constants';
import { useGameStore } from '@/lib/game-store';

interface AvatarAgentProps {
  id: string;
  accentHex: string;
  startX: number;
  startY: number;
}

// Pre-compute stable random values per robot id to avoid Math.random() in render
const stableValues: Record<string, { opacities: number[][]; durations: number[][] }> = {};

function getStableValues(id: string, pattern: string[]) {
  if (!stableValues[id]) {
    stableValues[id] = {
      opacities: pattern.map((row) =>
        row.split('').map(() => 0.85 + Math.random() * 0.15)
      ),
      durations: pattern.map((row) =>
        row.split('').map(() => 2 + Math.random() * 2)
      ),
    };
  }
  return stableValues[id];
}

const patterns: Record<string, string[]> = {
  blue: [
    "  XXXXXX  ",
    " X      X ",
    "X  O  O  X",
    "X        X",
    "X  XXXX  X",
    " XXXXXXXX ",
    "    XX    ",
    "  XXXXXX  ",
    " X XXXX X ",
    " X XXXX X ",
    "   X  X   ",
    "  XX  XX  ",
  ],
  amber: [
    "    XX    ",
    "   XXXX   ",
    "  X XX X  ",
    " XXXXXXXX ",
    "XX  OO  XX",
    "XXXXXXXXXX",
    "  XXXXXX  ",
    "   XXXX   ",
    "  XXXXXX  ",
    " XX    XX ",
    " XX    XX ",
    "XXX    XXX",
  ],
  purple: [
    "  XXXXXX  ",
    " X      X ",
    "X  X  X  X",
    "X  O  O  X",
    "X  XXXX  X",
    " XXXXXXXX ",
    " XXXXXXXX ",
    "XXXXXXXXXX",
    "XXXXXXXXXX",
    "  XXXXXX  ",
    "  X    X  ",
    " XX    XX ",
  ],
  green: [
    " XXXXXXXX ",
    " X  XX  X ",
    " XXXXXXXX ",
    " XX OO XX ",
    " XXXXXXXX ",
    " X  XX  X ",
    " XXXXXXXX ",
    "    XX    ",
    "  XXXXXX  ",
    "  X    X  ",
    "  X    X  ",
    " XXX  XXX ",
  ],
};

function PixelRobotSVG({ id, accentHex }: { id: string; accentHex: string }) {
  const pattern = patterns[id] || patterns.blue;
  const { opacities, durations } = getStableValues(id, pattern);

  return (
    <div className="relative group">
      <div
        className="absolute inset-0 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"
        style={{ backgroundColor: accentHex }}
      />
      <svg
        width="40"
        height="48"
        viewBox="0 0 10 12"
        className="relative z-10 drop-shadow-[0_0_2px_rgba(255,255,255,0.2)]"
      >
        {pattern.map((row, y) => (
          <React.Fragment key={y}>
            {row.split('').map((char, x) => {
              if (char === 'X') {
                return (
                  <rect
                    key={`${x}-${y}`}
                    x={x}
                    y={y}
                    width="1"
                    height="1"
                    fill={accentHex}
                    opacity={opacities[y][x]}
                  />
                );
              }
              if (char === 'O') {
                return (
                  <rect
                    key={`${x}-${y}`}
                    x={x}
                    y={y}
                    width="1"
                    height="1"
                    fill="white"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.4;1;0.4"
                      dur={`${durations[y][x]}s`}
                      repeatCount="indefinite"
                    />
                  </rect>
                );
              }
              return null;
            })}
          </React.Fragment>
        ))}
      </svg>
    </div>
  );
}

export function AvatarAgent({ id, accentHex, startX, startY }: AvatarAgentProps) {
  const [position, setPosition] = useState({ x: startX, y: startY });
  const [facingRight, setFacingRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);
  const [quip, setQuip] = useState('');
  const animFrameRef = useRef<number>(0);
  const targetRef = useRef({ x: startX, y: startY });
  const posRef = useRef({ x: startX, y: startY });
  const pauseUntilRef = useRef(0);
  const trackAvatarHover = useGameStore((s) => s.trackAvatarHover);

  const pickNewTarget = useCallback(() => {
    const padding = 100;
    const maxX = (typeof window !== 'undefined' ? window.innerWidth : 1200) - padding;
    const maxY = (typeof window !== 'undefined' ? window.innerHeight : 800) - padding;
    targetRef.current = {
      x: padding + Math.random() * (maxX - padding),
      y: padding + Math.random() * (maxY - padding),
    };
    setFacingRight(targetRef.current.x > posRef.current.x);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let running = true;
    const speed = 0.25 + Math.random() * 0.15;

    pickNewTarget();

    const animate = () => {
      if (!running) return;

      const now = Date.now();
      if (now < pauseUntilRef.current || isHoveredRef.current) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const dx = targetRef.current.x - posRef.current.x;
      const dy = targetRef.current.y - posRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 5) {
        pauseUntilRef.current = now + 2000 + Math.random() * 3000;
        pickNewTarget();
      } else {
        const moveX = (dx / dist) * speed;
        const moveY = (dy / dist) * speed;
        posRef.current = {
          x: posRef.current.x + moveX,
          y: posRef.current.y + moveY,
        };
        setPosition({ ...posRef.current });
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animFrameRef.current);
      } else {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(animFrameRef.current);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [pickNewTarget]);

  const handleHover = () => {
    setIsHovered(true);
    isHoveredRef.current = true;
    trackAvatarHover(id);
    const quips = avatarQuips[id] || avatarQuips.blue;
    setQuip(quips[Math.floor(Math.random() * quips.length)]);
  };

  const handleLeave = () => {
    setIsHovered(false);
    isHoveredRef.current = false;
  };

  return (
    <motion.div
      className="fixed z-50 cursor-pointer select-none"
      style={{ left: position.x, top: position.y }}
      animate={{
        y: isHovered ? 0 : [0, -4, 0],
      }}
      transition={{
        y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
      }}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {isHovered && quip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: 8, scale: 0.9, x: '-50%' }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 mb-3 w-56 px-4 py-3 rounded-2xl text-[12px] leading-relaxed text-text-primary border border-white/[0.1] shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(15,15,35,0.95) 0%, rgba(5,5,20,0.98) 100%)',
              backdropFilter: 'blur(16px)',
            }}
          >
            {quip}
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: '6px solid rgba(255,255,255,0.1)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar */}
      <div
        style={{ transform: facingRight ? 'scaleX(1)' : 'scaleX(-1)' }}
        className="transition-transform duration-500"
      >
        <PixelRobotSVG id={id} accentHex={accentHex} />
      </div>
    </motion.div>
  );
}
