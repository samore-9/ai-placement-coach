import { useMemo } from 'react';
import { format } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const intensity = (count) => {
  if (count === 0) return 'bg-ink-100 dark:bg-ink-700/50';
  if (count === 1) return 'bg-signal-200 dark:bg-signal-900';
  if (count <= 3) return 'bg-signal-400 dark:bg-signal-700';
  return 'bg-signal-600 dark:bg-signal-400';
};

export function ActivityHeatmap({ data = [] }) {
  const weeks = useMemo(() => {
    const byDate = new Map(data.map((d) => [format(new Date(d.date), 'yyyy-MM-dd'), d.count]));

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = [];
    for (let i = 181; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = format(d, 'yyyy-MM-dd');
      days.push({ date: d, count: byDate.get(key) || 0 });
    }

    // Pad to start on a Sunday so weeks align into columns
    const leadingEmpty = days[0].date.getDay();
    const padded = Array(leadingEmpty).fill(null).concat(days);

    const cols = [];
    for (let i = 0; i < padded.length; i += 7) {
      cols.push(padded.slice(i, i + 7));
    }
    return cols;
  }, [data]);

  const totalSolves = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Coding Activity</CardTitle>
        <p className="text-xs text-ink-400">{totalSolves} problems solved in the last 6 months</p>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="flex gap-1">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((day, di) =>
                day ? (
                  <div
                    key={di}
                    title={`${format(day.date, 'MMM d, yyyy')}: ${day.count} solved`}
                    className={`h-3 w-3 rounded-sm ${intensity(day.count)}`}
                  />
                ) : (
                  <div key={di} className="h-3 w-3" />
                )
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-ink-400">
          <span>Less</span>
          <span className="h-3 w-3 rounded-sm bg-ink-100 dark:bg-ink-700/50" />
          <span className="h-3 w-3 rounded-sm bg-signal-200 dark:bg-signal-900" />
          <span className="h-3 w-3 rounded-sm bg-signal-400 dark:bg-signal-700" />
          <span className="h-3 w-3 rounded-sm bg-signal-600 dark:bg-signal-400" />
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
}
