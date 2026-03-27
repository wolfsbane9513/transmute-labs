import React from 'react';
import { cn } from '@/lib/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'green' | 'blue' | 'purple';
}

const variantStyles: Record<string, string> = {
  default: 'bg-amber-400/15 text-amber-300 border-amber-400/30',
  outline: 'text-amber-300 border-amber-400/40 bg-transparent',
  green: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30',
  blue: 'bg-blue-400/15 text-blue-300 border-blue-400/30',
  purple: 'bg-purple-400/15 text-purple-300 border-purple-400/30',
};

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  ...props
}) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full px-3.5 py-1 text-xs font-semibold tracking-wide uppercase border transition-colors',
      variantStyles[variant],
      className,
    )}
    {...props}
  />
);
