'use client';

import React from 'react';
import { cn } from '@/lib/cn';

const bgStyles: Record<string, string> = {
  deep: 'bg-deep',
  base: 'bg-base',
  elevated: 'bg-elevated',
};

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  bg?: 'deep' | 'base' | 'elevated';
  divider?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  bg = 'deep',
  divider = false,
  className,
  children,
  ...props
}) => (
  <section className={cn('relative py-24 sm:py-32 px-4', bgStyles[bg], className)} {...props}>
    {divider && <div className="section-divider absolute top-0 left-0 right-0" />}
    {children}
  </section>
);
