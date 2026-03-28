'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { DynamicBackground } from '@/components/ui/dynamic-background';

const bgStyles: Record<string, string> = {
  deep: 'bg-deep',
  base: 'bg-base',
  elevated: 'bg-elevated',
};

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  bg?: 'deep' | 'base' | 'elevated';
  divider?: boolean;
  backgroundVariant?: 'hero' | 'services' | 'case-studies' | 'advantage' | 'contact';
}

export const Section: React.FC<SectionProps> = ({
  bg = 'deep',
  divider = false,
  backgroundVariant,
  className,
  children,
  ...props
}) => (
  <section className={cn('relative py-24 sm:py-32 px-4', bgStyles[bg], className)} {...props}>
    {divider && <div className="section-divider absolute top-0 left-0 right-0" />}
    {backgroundVariant && <DynamicBackground variant={backgroundVariant} />}
    <div className="relative z-10">
      {children}
    </div>
  </section>
);
