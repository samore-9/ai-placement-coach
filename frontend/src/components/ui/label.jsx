import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Label = forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn('mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-100', className)}
    {...props}
  />
));
Label.displayName = 'Label';
