import { Card, CardContent } from '@/components/ui/card';

const scoreColor = (score) => {
  if (score >= 80) return { text: 'text-status-success', ring: '#1AAE7A' };
  if (score >= 60) return { text: 'text-status-warning', ring: '#F5A623' };
  return { text: 'text-status-danger', ring: '#E5484D' };
};

export function StrengthScoreCard({ score }) {
  const { text, ring } = scoreColor(score);
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (score / 100) * circumference;

  return (
    <Card>
      <CardContent className="flex flex-col items-center p-6">
        <p className="text-sm font-medium text-ink-500 dark:text-ink-300">Resume Strength Score</p>
        <div className="relative mt-4 h-32 w-32">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#E4E7EC" strokeWidth="9" />
            <circle
              cx="50" cy="50" r="42" fill="none" stroke={ring} strokeWidth="9" strokeLinecap="round"
              strokeDasharray={circumference} strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 1s ease-out' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`font-mono text-3xl font-semibold ${text}`}>{score}</span>
            <span className="text-xs text-ink-400">/ 100</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
