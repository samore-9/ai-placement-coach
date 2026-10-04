import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-signal-500 text-white shadow-card hover:bg-signal-600 active:bg-signal-700',
        secondary:
          'bg-white text-ink-900 border border-ink-100 hover:border-signal-300 hover:text-signal-600 dark:bg-surface-dark-card dark:text-ink-100 dark:border-ink-700',
        ghost: 'text-ink-500 hover:text-ink-900 hover:bg-ink-100/60 dark:hover:bg-white/5 dark:text-ink-300',
        outline: 'border border-signal-500 text-signal-500 hover:bg-signal-50 dark:hover:bg-signal-900/30',
        gradient: 'bg-gradient-signal text-white shadow-card hover:shadow-card-hover hover:-translate-y-0.5',
        danger: 'bg-status-danger text-white hover:opacity-90',
      },
      size: {
        sm: 'h-9 px-3.5 text-xs',
        md: 'h-11 px-5',
        lg: 'h-13 px-7 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

export const Button = forwardRef(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
));
Button.displayName = 'Button';

export { buttonVariants };
