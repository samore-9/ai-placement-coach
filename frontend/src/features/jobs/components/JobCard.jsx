import { FiBookmark, FiMapPin, FiClock, FiDollarSign } from 'react-icons/fi';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const JOB_TYPE_LABEL = { internship: 'Internship', full_time: 'Full-time', internship_ppo: 'Internship + PPO' };

export function JobCard({ job, onToggleBookmark, onApply, applying }) {
  const packageText = job.package?.min
    ? `₹${(job.package.min / 100000).toFixed(1)}L${job.package.max ? `–${(job.package.max / 100000).toFixed(1)}L` : ''}`
    : null;

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink-900 dark:text-ink-100">{job.role}</p>
            <p className="text-xs text-ink-400">{job.companyName}</p>
          </div>
          <button
            onClick={() => onToggleBookmark(job._id)}
            className={cn('shrink-0 p-1', job.isBookmarked ? 'text-streak-500' : 'text-ink-300 hover:text-ink-500')}
          >
            <FiBookmark size={16} fill={job.isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink-400">
          <span className="flex items-center gap-1"><FiMapPin size={12} /> {job.location}</span>
          {packageText && <span className="flex items-center gap-1"><FiDollarSign size={12} /> {packageText}</span>}
          <span className="flex items-center gap-1"><FiClock size={12} /> Apply by {format(new Date(job.deadline), 'MMM d')}</span>
        </div>

        <span className="mt-3 inline-block rounded-md bg-signal-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-signal-600 dark:bg-signal-900/40 dark:text-signal-300">
          {JOB_TYPE_LABEL[job.jobType]}
        </span>

        {job.requiredSkills?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {job.requiredSkills.slice(0, 4).map((s) => (
              <span key={s} className="rounded-md bg-ink-100/60 px-2 py-0.5 text-[11px] text-ink-500 dark:bg-white/5 dark:text-ink-300">{s}</span>
            ))}
          </div>
        )}

        <Button size="sm" variant="gradient" className="mt-4 w-full" onClick={() => onApply(job._id)} disabled={applying}>
          {applying ? 'Applying…' : 'Apply now'}
        </Button>
      </CardContent>
    </Card>
  );
}
