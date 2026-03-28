'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useCursorStore } from '@/lib/hooks';

export function CustomCursor() {
  const { type } = useCursorStore();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isVisible, setIsVisible] = useState(false);
  const hasMovedRef = useRef(false);
  const [isPointerFine, setIsPointerFine] = useState(false);

  // Only enable on pointer:fine devices (not touch)
  useEffect(() => {
    const mql = window.matchMedia('(pointer: fine)');
    setIsPointerFine(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsPointerFine(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isPointerFine) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => {
      if (hasMovedRef.current) setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isPointerFine]);

  // Hide native cursor on pointer:fine devices
  useEffect(() => {
    if (isPointerFine) {
      document.documentElement.style.cursor = 'none';
      document.body.style.cursor = 'none';
    }
    return () => {
      document.documentElement.style.cursor = '';
      document.body.style.cursor = '';
    };
  }, [isPointerFine]);

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: '#FBBF24',
    },
    hover: {
      width: 48,
      height: 48,
      backgroundColor: 'transparent',
      border: '1px solid #FBBF24',
    },
    active: {
      width: 32,
      height: 32,
      backgroundColor: '#FBBF24',
      scale: 0.8,
    },
    view: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(251, 191, 36, 0.1)',
      border: '1px solid rgba(251, 191, 36, 0.3)',
      backdropFilter: 'blur(4px)',
    }
  };

  if (!isPointerFine) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full hidden lg:flex items-center justify-center overflow-hidden"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        opacity: isVisible ? 1 : 0,
      }}
      animate={type}
      variants={variants}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    >
      {type === 'view' && (
        <span className="text-[10px] font-bold uppercase tracking-widest text-accent-amber">View</span>
      )}
      {type === 'hover' && (
        <motion.div
          className="w-1.5 h-1.5 bg-accent-amber rounded-full"
          layoutId="cursor-dot"
        />
      )}
    </motion.div>
  );
}
