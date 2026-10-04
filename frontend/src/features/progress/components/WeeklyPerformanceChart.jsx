import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format } from 'date-fns';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export function WeeklyPerformanceChart({ data = [] }) {
  const hasData = data.some((d) => d.xp > 0 || d.solved > 0);

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Weekly Performance</CardTitle>
        <CardDescription>XP earned and problems solved, by week</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        {hasData ? (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data} margin={{ top: 5, right: 16, bottom: 0, left: -16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EC" vertical={false} />
              <XAxis dataKey="weekStart" tickFormatter={(d) => format(new Date(d), 'MMM d')} tick={{ fontSize: 11, fill: '#8A93A6' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#8A93A6' }} axisLine={false} tickLine={false} />
              <Tooltip
                labelFormatter={(d) => `Week of ${format(new Date(d), 'MMM d')}`}
                contentStyle={{ borderRadius: 10, border: '1px solid #E4E7EC', fontSize: 12 }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="xp" name="XP" fill="#3557F0" radius={[4, 4, 0, 0]} />
              <Bar dataKey="solved" name="Problems Solved" fill="#F59B12" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[260px] flex-col items-center justify-center text-center">
            <p className="font-mono text-xs text-ink-400">no_weekly_data_yet</p>
            <p className="mt-2 max-w-xs text-sm text-ink-500 dark:text-ink-300">Complete a few tasks this week to see performance trends.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
