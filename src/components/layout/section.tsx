import React from 'react';
import { cn } from '@/lib/cn';

const bgStyles: Record<string, string> = {
  deep: 'bg-deep',
  base: 'bg-base',
  elevated: 'bg-elevated',
};

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  bg?: 'deep' | 'base' | 'elevated';
}

export const Section: React.FC<SectionProps> = ({
  bg = 'deep',
  className,
  ...props
}) => (
  <section className={cn('py-20 px-4', bgStyles[bg], className)} {...props} />
);
