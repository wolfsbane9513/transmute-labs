'use client';

import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, useSpring } from 'framer-motion';
import { create } from 'zustand';

// --- Cursor Store ---
type CursorType = 'default' | 'hover' | 'active' | 'view';

interface CursorStore {
  type: CursorType;
  setType: (type: CursorType) => void;
}

export const useCursorStore = create<CursorStore>((set) => ({
  type: 'default',
  setType: (type) => set({ type }),
}));

// --- useCountUp ---
export function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function: easeOutExpo
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentCount = Math.floor(easedProgress * end);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return { ref, count };
}

// --- useParallax ---
export function useParallax(distance: number = 50) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const springY = useSpring(y, { stiffness: 100, damping: 30, mass: 0.5 });

  return { ref, y: springY };
}
