import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';

export function ReadinessGauge({ value = 0 }) {
  const data = [{ name: 'readiness', value, fill: 'url(#readinessGradient)' }];

  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm font-medium text-ink-500 dark:text-ink-300">Placement Readiness</p>
        <div className="relative mx-auto mt-2 h-44 w-44">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart innerRadius="78%" outerRadius="100%" data={data} startAngle={90} endAngle={-270}>
              <defs>
                <linearGradient id="readinessGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3557F0" />
                  <stop offset="100%" stopColor="#8FA4FF" />
                </linearGradient>
              </defs>
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar background={{ fill: 'var(--tw-readiness-track, #E4E7EC)' }} dataKey="value" cornerRadius={12} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-3xl font-semibold text-ink-900 dark:text-ink-100">{value}%</span>
            <span className="text-xs text-ink-400">ready</span>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-ink-400">
          Based on ATS score, skill gap, DSA progress, and roadmap completion.
        </p>
      </CardContent>
    </Card>
  );
}
