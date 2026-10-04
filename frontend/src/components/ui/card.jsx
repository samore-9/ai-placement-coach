import { cn } from '@/lib/utils';

export const Card = ({ className, ...props }) => (
  <div
    className={cn(
      'rounded-2xl border border-ink-100 bg-white shadow-card dark:bg-surface-dark-card dark:border-ink-700/60',
      className
    )}
    {...props}
  />
);

export const CardHeader = ({ className, ...props }) => (
  <div className={cn('p-6 pb-3', className)} {...props} />
);

export const CardTitle = ({ className, ...props }) => (
  <h3 className={cn('font-display text-lg font-semibold text-ink-900 dark:text-ink-100', className)} {...props} />
);

export const CardDescription = ({ className, ...props }) => (
  <p className={cn('text-sm text-ink-500 dark:text-ink-300', className)} {...props} />
);

export const CardContent = ({ className, ...props }) => <div className={cn('p-6 pt-0', className)} {...props} />;

export const CardFooter = ({ className, ...props }) => (
  <div className={cn('flex items-center p-6 pt-0', className)} {...props} />
);
