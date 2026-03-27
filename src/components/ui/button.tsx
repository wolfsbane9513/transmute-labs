'use client';

import React from 'react';
import { cn } from '@/lib/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const variantStyles: Record<string, string> = {
  primary: 'bg-gradient-to-r from-amber-400 to-amber-500 text-deep hover:from-amber-300 hover:to-amber-400 font-semibold shadow-lg shadow-amber-500/20 hover:shadow-amber-400/30 shimmer-btn',
  outline: 'border border-white/15 text-text-secondary hover:text-text-primary hover:bg-white/[0.04] hover:border-amber-400/30 bg-transparent',
  ghost: 'text-text-secondary hover:bg-white/[0.04] hover:text-text-primary',
};

const sizeStyles: Record<string, string> = {
  default: 'h-11 px-5 py-2.5 text-sm',
  sm: 'h-9 px-4 text-sm',
  lg: 'h-13 px-8 py-3 text-base',
  icon: 'h-11 w-11',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-deep',
          'disabled:opacity-50 disabled:pointer-events-none',
          'min-h-[44px] min-w-[44px]',
          'active:scale-[0.98]',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
