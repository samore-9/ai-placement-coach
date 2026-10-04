import { FiCheckCircle, FiCircle } from 'react-icons/fi';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CATEGORY_LABEL = {
  coding: 'Coding',
  interview_question: 'Interview Question',
  cs_concept: 'CS Concept',
  aptitude: 'Aptitude',
  hr_question: 'HR Question',
  other: 'Task',
};

export function TodayGoalCard({ task, summary, onComplete }) {
  return (
    <Card className="lg:col-span-2">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-ink-500 dark:text-ink-300">Today's Goal</p>
          {summary && (
            <span className="font-mono text-xs text-ink-400">
              {summary.completed}/{summary.total} done today
            </span>
          )}
        </div>

        {task ? (
          <div className="mt-4 flex items-start justify-between gap-4 rounded-xl border border-ink-100 dark:border-ink-700/60 p-4">
            <div className="flex items-start gap-3">
              <FiCircle className="mt-0.5 shrink-0 text-signal-500" size={18} />
              <div>
                <span className="inline-block rounded-md bg-signal-50 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase text-signal-600 dark:bg-signal-900/40 dark:text-signal-300">
                  {CATEGORY_LABEL[task.category] || 'Task'}
                </span>
                <p className="mt-1.5 text-sm font-medium text-ink-900 dark:text-ink-100">{task.title}</p>
                <p className="mt-0.5 text-xs text-ink-400">+{task.xpReward} XP on completion</p>
              </div>
            </div>
            <Button size="sm" onClick={() => onComplete(task._id)}>
              Mark done
            </Button>
          </div>
        ) : (
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-ink-100 dark:border-ink-700 p-4">
            <FiCheckCircle className="text-status-success" size={18} />
            <p className="text-sm text-ink-500 dark:text-ink-300">
              All caught up for today — nice work. New tasks land at midnight.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
