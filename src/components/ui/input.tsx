import React from 'react';
import { cn } from '@/lib/cn';

const baseInputStyles = 'w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-colors min-h-[44px]';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div>
        <label htmlFor={inputId} className="block text-sm font-medium text-text-secondary mb-2">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(baseInputStyles, className)}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, className, id, ...props }, ref) => {
    const selectId = id || label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div>
        <label htmlFor={selectId} className="block text-sm font-medium text-text-secondary mb-2">
          {label}
        </label>
        <select
          ref={ref}
          id={selectId}
          className={cn(baseInputStyles, className)}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);
Select.displayName = 'Select';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, className, id, ...props }, ref) => {
    const textareaId = id || label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div>
        <label htmlFor={textareaId} className="block text-sm font-medium text-text-secondary mb-2">
          {label}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(baseInputStyles, 'min-h-[120px]', className)}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
