'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { avatarQuips } from '@/lib/chat-constants';
import { useGameStore } from '@/lib/game-store';

interface AvatarAgentProps {
  id: string;
  color: string;
  accentHex: string;
  startX: number;
  startY: number;
}

function RobotSVG({ color, accentHex }: { color: string; accentHex: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      {/* Antenna */}
      <line x1="18" y1="2" x2="18" y2="7" stroke={accentHex} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="18" cy="2" r="1.5" fill={accentHex} opacity="0.8">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
      </circle>
      {/* Head */}
      <rect x="8" y="7" width="20" height="16" rx="4" fill="currentColor" className={color} opacity="0.15" stroke={accentHex} strokeWidth="1" strokeOpacity="0.3" />
      {/* Eyes */}
      <circle cx="13" cy="15" r="2.5" fill={accentHex} opacity="0.9">
        <animate attributeName="r" values="2.5;2;2.5" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="23" cy="15" r="2.5" fill={accentHex} opacity="0.9">
        <animate attributeName="r" values="2.5;2;2.5" dur="3s" repeatCount="indefinite" />
      </circle>
      {/* Mouth */}
      <path d="M13 20 Q18 23 23 20" stroke={accentHex} strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round" />
      {/* Body */}
      <rect x="11" y="24" width="14" height="8" rx="3" fill="currentColor" className={color} opacity="0.1" stroke={accentHex} strokeWidth="1" strokeOpacity="0.2" />
      {/* Legs */}
      <line x1="14" y1="32" x2="14" y2="35" stroke={accentHex} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="22" y1="32" x2="22" y2="35" stroke={accentHex} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

export function AvatarAgent({ id, color, accentHex, startX, startY }: AvatarAgentProps) {
  const [position, setPosition] = useState({ x: startX, y: startY });
  const [facingRight, setFacingRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [quip, setQuip] = useState('');
  const animFrameRef = useRef<number>(0);
  const targetRef = useRef({ x: startX, y: startY });
  const posRef = useRef({ x: startX, y: startY });
  const pauseUntilRef = useRef(0);
  const trackAvatarHover = useGameStore((s) => s.trackAvatarHover);

  const pickNewTarget = useCallback(() => {
    const padding = 60;
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
    const speed = 0.3 + Math.random() * 0.2; // pixels per frame

    pickNewTarget();

    const animate = () => {
      if (!running) return;

      const now = Date.now();
      if (now < pauseUntilRef.current || isHovered) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const dx = targetRef.current.x - posRef.current.x;
      const dy = targetRef.current.y - posRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 5) {
        // Reached target, pause then pick new one
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
  }, [pickNewTarget, isHovered]);

  const handleHover = () => {
    setIsHovered(true);
    trackAvatarHover(id);
    const quips = avatarQuips[id] || avatarQuips.blue;
    setQuip(quips[Math.floor(Math.random() * quips.length)]);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      className="fixed z-50 cursor-pointer select-none"
      style={{ left: position.x, top: position.y }}
      animate={{
        y: isHovered ? 0 : [0, -3, 0],
      }}
      transition={{
        y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
      }}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {isHovered && quip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 px-3 py-2 rounded-xl text-[11px] leading-relaxed text-text-secondary border border-white/[0.08] shadow-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(10,10,27,0.95) 0%, rgba(5,5,16,0.98) 100%)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {quip}
            {/* Arrow */}
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: '5px solid rgba(255,255,255,0.08)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar */}
      <div
        style={{ transform: facingRight ? 'scaleX(1)' : 'scaleX(-1)' }}
        className="transition-transform duration-300"
      >
        <RobotSVG color={color} accentHex={accentHex} />
      </div>
    </motion.div>
  );
}
