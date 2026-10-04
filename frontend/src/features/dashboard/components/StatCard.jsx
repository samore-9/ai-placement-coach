import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function StatCard({ icon: Icon, label, value, sub, accent = 'signal' }) {
  const accentClasses = {
    signal: 'bg-signal-50 text-signal-500 dark:bg-signal-900/40',
    streak: 'bg-streak-400/10 text-streak-500',
    success: 'bg-status-success/10 text-status-success',
  };

  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', accentClasses[accent])}>
          <Icon size={19} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-ink-400">{label}</p>
          <p className="font-mono text-xl font-semibold text-ink-900 dark:text-ink-100">{value}</p>
          {sub && <p className="text-xs text-ink-400">{sub}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
