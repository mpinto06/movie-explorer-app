import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'flex h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 text-slate-900 transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10',
            error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/10 dark:border-rose-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm font-medium text-rose-500 dark:text-rose-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
