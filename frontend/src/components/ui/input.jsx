import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Input = forwardRef(({ className, type = 'text', error, ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      'flex h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-ink-900 placeholder:text-ink-300 transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500',
      'dark:bg-surface-dark-card dark:text-ink-100 dark:placeholder:text-ink-500',
      error ? 'border-status-danger' : 'border-ink-100 dark:border-ink-700',
      className
    )}
    {...props}
  />
));
Input.displayName = 'Input';
