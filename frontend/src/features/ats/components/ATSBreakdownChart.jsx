import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const LABELS = {
  formatting: 'Formatting',
  keywords: 'Keywords',
  skills: 'Skills',
  projects: 'Projects',
  experience: 'Experience',
  education: 'Education',
  achievements: 'Achievements',
  resumeLength: 'Resume Length',
};

const barColor = (v) => (v >= 80 ? '#1AAE7A' : v >= 60 ? '#F59B12' : '#E5484D');

export function ATSBreakdownChart({ breakdown }) {
  const data = Object.entries(breakdown || {}).map(([key, value]) => ({ name: LABELS[key] || key, value }));

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Score Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} layout="vertical" margin={{ left: 12, right: 16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EC" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#8A93A6' }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12, fill: '#4A5468' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: 10, border: '1px solid #E4E7EC', fontSize: 12 }}
              formatter={(v) => [`${v}/100`, 'Score']}
            />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={16}>
              {data.map((d, i) => (
                <Cell key={i} fill={barColor(d.value)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
