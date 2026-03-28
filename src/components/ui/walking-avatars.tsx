'use client';

import React, { useState, useEffect } from 'react';
import { AvatarAgent } from './avatar-agent';

const avatarConfigs = [
  { id: 'blue', color: 'text-blue-400', accentHex: '#60A5FA' },
  { id: 'amber', color: 'text-amber-400', accentHex: '#FBBF24' },
  { id: 'purple', color: 'text-purple-400', accentHex: '#A78BFA' },
  { id: 'green', color: 'text-green-400', accentHex: '#34D399' },
];

export function WalkingAvatars() {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setMounted(true);

    const check = () => {
      // Only show on desktop with pointer: fine (no touch devices)
      const isWide = window.innerWidth >= 1024;
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsDesktop(isWide && hasFinePointer && !prefersReduced);
    };

    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!mounted || !isDesktop) return null;

  return (
    <>
      {avatarConfigs.map((config, i) => (
        <AvatarAgent
          key={config.id}
          {...config}
          startX={150 + i * 300}
          startY={200 + (i % 2) * 200}
        />
      ))}
    </>
  );
}
