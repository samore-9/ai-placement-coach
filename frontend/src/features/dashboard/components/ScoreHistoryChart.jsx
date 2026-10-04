import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-ink-100 bg-white px-3 py-2 text-xs shadow-card dark:bg-surface-dark-card dark:border-ink-700">
      <p className="font-mono text-ink-400">{label ? format(new Date(label), 'MMM d') : ''}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }} className="font-medium">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

export function ScoreHistoryChart({ data = [] }) {
  const hasData = data.length > 1;

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Score History</CardTitle>
        <CardDescription>ATS score and skill score over the last 30 days</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        {hasData ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={data} margin={{ top: 5, right: 16, bottom: 0, left: -16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EC" vertical={false} />
              <XAxis
                dataKey="date"
                tickFormatter={(d) => format(new Date(d), 'MMM d')}
                tick={{ fontSize: 11, fill: '#8A93A6' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#8A93A6' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="atsScore" name="ATS Score" stroke="#3557F0" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="skillScore" name="Skill Score" stroke="#F59B12" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[240px] flex-col items-center justify-center text-center">
            <p className="font-mono text-xs text-ink-400">no_history_yet</p>
            <p className="mt-2 max-w-xs text-sm text-ink-500 dark:text-ink-300">
              Run a resume scan and complete a few daily tasks — your score trend will show up here.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
