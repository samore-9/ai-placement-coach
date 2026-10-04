import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BulletListCard } from '@/components/common/BulletListCard';
import { Button } from '@/components/ui/button';

const METRICS = [
  { key: 'technicalAccuracy', label: 'Technical Accuracy' },
  { key: 'confidence', label: 'Confidence' },
  { key: 'communication', label: 'Communication' },
  { key: 'grammar', label: 'Grammar' },
];

const barColor = (v) => (v >= 80 ? 'bg-status-success' : v >= 60 ? 'bg-status-warning' : 'bg-status-danger');

export function InterviewEvaluationResult({ evaluation, onNewRound }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-ink-500 dark:text-ink-300">Overall Rating</p>
            <span className="font-mono text-3xl font-semibold text-signal-500">{evaluation.overallRating}<span className="text-base text-ink-400">/100</span></span>
          </div>

          <div className="mt-5 space-y-3">
            {METRICS.map((m) => (
              <div key={m.key}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-ink-500 dark:text-ink-300">{m.label}</span>
                  <span className="font-mono font-medium text-ink-700 dark:text-ink-100">{evaluation[m.key]}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-100 dark:bg-ink-700">
                  <div className={`h-full rounded-full ${barColor(evaluation[m.key])}`} style={{ width: `${evaluation[m.key]}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Feedback</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-ink-700 dark:text-ink-100">{evaluation.feedback}</p>
        </CardContent>
      </Card>

      <BulletListCard title="Improvement Areas" items={evaluation.improvementAreas} tone="warning" emptyText="No specific improvement areas flagged." />

      <Button variant="gradient" className="w-full" onClick={onNewRound}>
        Try another question
      </Button>
    </div>
  );
}
