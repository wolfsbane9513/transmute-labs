'use client';

import React from 'react';
import { cn } from '@/lib/cn';

const baseInputStyles = 'w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/30 focus:bg-white/[0.05] transition-all duration-300 min-h-[44px]';
const errorInputStyles = 'border-rose-500/50 focus:ring-rose-500/30 focus:border-rose-500/40';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, id, error, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="space-y-2">
        <label htmlFor={inputId} className="block text-sm font-medium text-text-secondary">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(baseInputStyles, error && errorInputStyles, className)}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-rose-400 mt-1 font-medium">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, className, id, error, ...props }, ref) => {
    const selectId = id || label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="space-y-2">
        <label htmlFor={selectId} className="block text-sm font-medium text-text-secondary">
          {label}
        </label>
        <select
          ref={ref}
          id={selectId}
          className={cn(baseInputStyles, error && errorInputStyles, className)}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${selectId}-error` : undefined}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-deep text-text-primary">
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={`${selectId}-error`} className="text-xs text-rose-400 mt-1 font-medium">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, className, id, error, ...props }, ref) => {
    const textareaId = id || label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="space-y-2">
        <label htmlFor={textareaId} className="block text-sm font-medium text-text-secondary">
          {label}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(baseInputStyles, 'min-h-[140px] resize-none', error && errorInputStyles, className)}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="text-xs text-rose-400 mt-1 font-medium">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
