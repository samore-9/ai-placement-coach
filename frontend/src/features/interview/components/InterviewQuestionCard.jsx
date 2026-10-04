import { useState } from 'react';
import { FiBookmark, FiChevronDown } from 'react-icons/fi';
import { cn } from '@/lib/utils';

export function InterviewQuestionCard({ question, onToggleBookmark }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-ink-100 dark:border-ink-700/60 last:border-0">
      <button onClick={() => setOpen(!open)} className="flex w-full items-start gap-3 px-5 py-4 text-left">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {question.company && (
              <span className="rounded-md bg-signal-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-signal-600 dark:bg-signal-900/40 dark:text-signal-300">
                {question.company}
              </span>
            )}
            <span className="rounded-md bg-ink-100/60 px-2 py-0.5 font-mono text-[10px] uppercase text-ink-400 dark:bg-white/5">
              {question.topic}
            </span>
          </div>
          <p className="mt-1.5 text-sm font-medium text-ink-900 dark:text-ink-100">{question.question}</p>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onToggleBookmark(question._id); }}
          className={cn('shrink-0 p-1', question.isBookmarked ? 'text-streak-500' : 'text-ink-300 hover:text-ink-500')}
        >
          <FiBookmark size={16} fill={question.isBookmarked ? 'currentColor' : 'none'} />
        </button>
        <FiChevronDown size={15} className={cn('mt-1 shrink-0 text-ink-400 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="space-y-4 px-5 pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Sample best answer</p>
            <p className="mt-1 text-sm text-ink-700 dark:text-ink-100">{question.sampleBestAnswer || question.expectedAnswer}</p>
          </div>

          {question.recruiterPerspective && (
            <div className="rounded-lg bg-signal-50 dark:bg-signal-900/20 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-signal-600 dark:text-signal-300">Recruiter perspective</p>
              <p className="mt-1 text-sm text-ink-700 dark:text-ink-100">{question.recruiterPerspective}</p>
            </div>
          )}

          {question.commonMistakes?.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Common mistakes</p>
              <ul className="mt-1 space-y-1">
                {question.commonMistakes.map((m, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-ink-500 dark:text-ink-300">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-status-danger" /> {m}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {question.followUpQuestions?.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Follow-up questions</p>
              <ul className="mt-1 space-y-1">
                {question.followUpQuestions.map((f, i) => (
                  <li key={i} className="text-sm text-ink-500 dark:text-ink-300">— {f}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
