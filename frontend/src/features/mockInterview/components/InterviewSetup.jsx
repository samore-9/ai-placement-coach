import { useState } from 'react';
import { FiPlay } from 'react-icons/fi';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const TOPICS = [
  { value: 'dsa', label: 'DSA' },
  { value: 'system_design', label: 'System Design' },
  { value: 'core_cs', label: 'Core CS' },
  { value: 'behavioral', label: 'Behavioral' },
  { value: 'hr', label: 'HR' },
  { value: 'technical', label: 'General Technical' },
];

const DIFFICULTIES = ['easy', 'medium', 'hard'];

export function InterviewSetup({ onStart, starting }) {
  const [topic, setTopic] = useState('technical');
  const [difficulty, setDifficulty] = useState('medium');

  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm font-semibold text-ink-900 dark:text-ink-100">Start a mock interview round</p>

        <p className="mt-4 mb-2 text-xs font-medium text-ink-400">Topic</p>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <button
              key={t.value}
              onClick={() => setTopic(t.value)}
              className={cn(
                'rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors',
                topic === t.value
                  ? 'border-signal-500 bg-signal-50 text-signal-600 dark:bg-signal-900/40 dark:text-signal-300'
                  : 'border-ink-100 text-ink-500 dark:border-ink-700 dark:text-ink-300'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <p className="mt-4 mb-2 text-xs font-medium text-ink-400">Difficulty</p>
        <div className="flex gap-2">
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={cn(
                'flex-1 rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition-colors',
                difficulty === d
                  ? 'border-signal-500 bg-signal-50 text-signal-600 dark:bg-signal-900/40 dark:text-signal-300'
                  : 'border-ink-100 text-ink-500 dark:border-ink-700 dark:text-ink-300'
              )}
            >
              {d}
            </button>
          ))}
        </div>

        <Button onClick={() => onStart({ topic, difficulty })} disabled={starting} variant="gradient" className="mt-5 w-full">
          <FiPlay size={15} /> {starting ? 'Preparing question…' : 'Start round'}
        </Button>
      </CardContent>
    </Card>
  );
}
