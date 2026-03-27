'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

// ─── Parallax scroll effect ───
export function useParallax(offset: number = 50) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return { ref, y: smoothY };
}

// ─── Animated counter (counts up on scroll into view) ───
export function useCountUp(target: number, duration: number = 2500) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutCubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, hasStarted]);

  return { ref, count };
}

// ─── Scroll progress for a section ───
export function useSectionProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  return { ref, progress: scrollYProgress };
}

// ─── Mouse position relative to element ───
export function useMousePosition() {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return { ref, position };
}
