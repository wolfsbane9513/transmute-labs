import React from 'react';
import { cn } from '@/lib/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'green' | 'blue' | 'purple';
}

const variantStyles: Record<string, string> = {
  default: 'bg-accent-amber text-deep border-accent-amber',
  outline: 'text-amber-300 border-2 border-amber-400 bg-transparent',
  green: 'bg-emerald-600 text-white border-emerald-600',
  blue: 'bg-blue-600 text-white border-blue-600',
  purple: 'bg-purple-600 text-white border-purple-600',
};

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  ...props
}) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full px-3 py-1.5 text-sm font-semibold transition-colors border',
      variantStyles[variant],
      className,
    )}
    {...props}
  />
);
