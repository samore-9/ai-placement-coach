import { Link } from 'react-router-dom';

export function Logo({ className = '', to = '/' }) {
  return (
    <Link to={to} className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-signal">
        <span className="h-2.5 w-2.5 rounded-full bg-streak-400" />
      </span>
      <span className="font-display text-[17px] font-semibold tracking-tight text-ink-900 dark:text-ink-100">
        AI Placement Coach
      </span>
    </Link>
  );
}
