import { useState } from 'react';
import { FiBookmark, FiChevronDown, FiCheckCircle, FiExternalLink, FiPlayCircle } from 'react-icons/fi';
import { cn } from '@/lib/utils';

const DIFFICULTY_STYLE = {
  easy: 'text-status-success bg-status-success/10',
  medium: 'text-status-warning bg-status-warning/10',
  hard: 'text-status-danger bg-status-danger/10',
};

export function CodingQuestionRow({ question, onToggleBookmark, onMarkSolved }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-ink-100 dark:border-ink-700/60 last:border-0">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center gap-3 px-5 py-4 text-left">
        <span className={cn('shrink-0 rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold uppercase', DIFFICULTY_STYLE[question.difficulty])}>
          {question.difficulty}
        </span>
        <span className="flex-1 truncate text-sm font-medium text-ink-900 dark:text-ink-100">{question.title}</span>
        <span className="hidden sm:block font-mono text-[11px] text-ink-400">
          {question.topics?.slice(0, 2).join(', ')}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onToggleBookmark(question._id); }}
          className={cn('shrink-0 p-1', question.isBookmarked ? 'text-streak-500' : 'text-ink-300 hover:text-ink-500')}
        >
          <FiBookmark size={16} fill={question.isBookmarked ? 'currentColor' : 'none'} />
        </button>
        <FiChevronDown size={15} className={cn('shrink-0 text-ink-400 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="px-5 pb-5">
          <p className="text-sm text-ink-500 dark:text-ink-300">{question.description}</p>

          {question.examples?.length > 0 && (
            <div className="mt-3 rounded-lg bg-ink-100/40 dark:bg-white/5 p-3 font-mono text-xs">
              <p><span className="text-ink-400">Input:</span> {question.examples[0].input}</p>
              <p><span className="text-ink-400">Output:</span> {question.examples[0].output}</p>
              {question.examples[0].explanation && <p className="mt-1 text-ink-400">{question.examples[0].explanation}</p>}
            </div>
          )}

          {question.hints?.length > 0 && (
            <details className="mt-3">
              <summary className="cursor-pointer text-xs font-medium text-signal-500">Show hint</summary>
              <p className="mt-1.5 text-xs text-ink-500 dark:text-ink-300">{question.hints[0]}</p>
            </details>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-ink-400">
            {question.complexity?.time && <span>Time: <span className="font-mono">{question.complexity.time}</span></span>}
            {question.complexity?.space && <span>Space: <span className="font-mono">{question.complexity.space}</span></span>}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => onMarkSolved(question._id)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-signal-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-signal-600"
            >
              <FiCheckCircle size={13} /> Mark solved
            </button>
            {question.videoUrl && (
              <a href={question.videoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-ink-100 dark:border-ink-700 px-3 py-1.5 text-xs font-medium text-ink-500 dark:text-ink-300">
                <FiPlayCircle size={13} /> Video
              </a>
            )}
            {question.externalLink && (
              <a href={question.externalLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-ink-100 dark:border-ink-700 px-3 py-1.5 text-xs font-medium text-ink-500 dark:text-ink-300">
                <FiExternalLink size={13} /> Solve on original site
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
