'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/lib/game-store';

const SECTION_IDS = ['hero', 'services', 'projects', 'team', 'about', 'contact'];

export function SectionTracker() {
  const trackSection = useGameStore((s) => s.trackSection);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            trackSection(id);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    // Track hero immediately (it's always visible on load)
    trackSection('hero');

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [trackSection]);

  return null;
}
