'use client';

import React, { useState, useEffect } from 'react';
import { AvatarAgent } from './avatar-agent';

const avatarConfigs = [
  { id: 'blue', accentHex: '#60A5FA' },
  { id: 'amber', accentHex: '#FBBF24' },
  { id: 'purple', accentHex: '#A78BFA' },
  { id: 'green', accentHex: '#34D399' },
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
