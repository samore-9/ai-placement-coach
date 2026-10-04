import { useState } from 'react';
import { FiHelpCircle, FiSend } from 'react-icons/fi';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function InterviewQuestionCard({ question, onSubmit, submitting, onNewRound }) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (!answer.trim()) return;
    onSubmit(answer.trim());
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <FiHelpCircle className="mt-0.5 shrink-0 text-signal-500" size={18} />
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wide text-ink-400">
              {question.topic.replace('_', ' ')} · {question.difficulty}
            </span>
            <p className="mt-1 text-sm font-medium leading-relaxed text-ink-900 dark:text-ink-100">{question.question}</p>
          </div>
        </div>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={6}
          placeholder="Type your answer as you would say it out loud…"
          className="mt-4 w-full rounded-xl border border-ink-100 bg-white p-3.5 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-signal-500 dark:bg-surface-dark-card dark:text-ink-100 dark:border-ink-700"
        />

        <div className="mt-3 flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={onNewRound}>Skip / new question</Button>
          <Button size="sm" variant="gradient" onClick={handleSubmit} disabled={submitting || !answer.trim()}>
            <FiSend size={14} /> {submitting ? 'Evaluating…' : 'Submit answer'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
