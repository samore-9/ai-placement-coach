import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function WeeklyTasksList({ weeklyTasks = [], onToggleWeek }) {
  const [openWeek, setOpenWeek] = useState(weeklyTasks[0]?.week ?? null);

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Weekly Tasks</CardTitle>
      </CardHeader>
      <CardContent className="divide-y divide-ink-100 dark:divide-ink-700/60 p-0">
        {weeklyTasks.map((w) => (
          <div key={w.week} className="px-6 py-4">
            <button
              onClick={() => setOpenWeek(openWeek === w.week ? null : w.week)}
              className="flex w-full items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={w.completed}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => onToggleWeek(w.week, e.target.checked)}
                  className="h-4 w-4 rounded accent-signal-500"
                />
                <span className={cn('text-sm font-medium', w.completed ? 'text-ink-400 line-through' : 'text-ink-900 dark:text-ink-100')}>
                  Week {w.week}
                </span>
              </div>
              <FiChevronDown size={15} className={cn('text-ink-400 transition-transform', openWeek === w.week && 'rotate-180')} />
            </button>
            {openWeek === w.week && (
              <ul className="mt-3 space-y-2 pl-7">
                {w.tasks.map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-ink-500 dark:text-ink-300">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-300" />
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function RequiredSkillsCard({ skills = [] }) {
  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Required Skills</CardTitle></CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span key={s} className="rounded-lg bg-signal-50 px-2.5 py-1 text-xs font-medium text-signal-600 dark:bg-signal-900/40 dark:text-signal-300">
              {s}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
