import { FiSearch } from 'react-icons/fi';
import { Input } from '@/components/ui/input';

const JOB_TYPES = [
  { value: 'internship', label: 'Internship' },
  { value: 'full_time', label: 'Full-time' },
  { value: 'internship_ppo', label: 'Internship + PPO' },
];

const selectClass = 'flex h-10 rounded-xl border border-ink-100 bg-white px-3 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-signal-500 dark:bg-surface-dark-card dark:text-ink-100 dark:border-ink-700';

export function JobFilters({ filters, onChange }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="relative flex-1 min-w-[180px]">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" size={15} />
        <Input placeholder="Search role or company…" className="pl-9 h-10" value={filters.search} onChange={(e) => onChange({ search: e.target.value })} />
      </div>
      <Input placeholder="Location" className="h-10 sm:w-40" value={filters.location} onChange={(e) => onChange({ location: e.target.value })} />
      <select className={selectClass} value={filters.jobType} onChange={(e) => onChange({ jobType: e.target.value })}>
        <option value="">All job types</option>
        {JOB_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
      </select>
    </div>
  );
}
