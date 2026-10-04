import { FiCheck } from 'react-icons/fi';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const STATUS_STYLE = {
  completed: 'bg-signal-500 text-white',
  in_progress: 'bg-gradient-streak text-white ring-4 ring-streak-400/20',
  pending: 'bg-ink-100 text-ink-400 dark:bg-ink-700 dark:text-ink-400',
  locked: 'bg-ink-100 text-ink-300 dark:bg-ink-700 dark:text-ink-600',
};

const NEXT_STATUS = {
  pending: 'in_progress',
  in_progress: 'completed',
  completed: 'pending', // allow undo
  locked: 'locked',
};

export function MilestoneTimeline({ milestones = [], onToggle }) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="mb-6 text-sm font-semibold text-ink-900 dark:text-ink-100">Milestone Path</p>

        <div className="space-y-1">
          {milestones.map((m, i) => (
            <button
              key={m._id || m.stage}
              onClick={() => onToggle(m._id, NEXT_STATUS[m.status])}
              disabled={m.status === 'locked'}
              className={cn(
                'flex w-full items-start gap-4 rounded-xl p-3 text-left transition-colors',
                m.status !== 'locked' && 'hover:bg-ink-100/50 dark:hover:bg-white/5',
                m.status === 'locked' && 'cursor-not-allowed opacity-60'
              )}
            >
              <div className="flex flex-col items-center">
                <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-mono font-semibold', STATUS_STYLE[m.status])}>
                  {m.status === 'completed' ? <FiCheck size={14} /> : i + 1}
                </span>
                {i < milestones.length - 1 && <span className="mt-1 h-8 w-[2px] bg-ink-100 dark:bg-ink-700" />}
              </div>
              <div className="pt-1">
                <p className="text-sm font-medium text-ink-900 dark:text-ink-100">{m.title}</p>
                {m.description && <p className="mt-0.5 text-xs text-ink-400">{m.description}</p>}
                <span className="mt-1 inline-block font-mono text-[10px] uppercase tracking-wide text-ink-300">
                  {m.status.replace('_', ' ')}
                </span>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
