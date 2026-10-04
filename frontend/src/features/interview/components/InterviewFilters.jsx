import { FiSearch } from 'react-icons/fi';
import { Input } from '@/components/ui/input';

const TOPICS = ['hr', 'technical', 'behavioral', 'dbms', 'os', 'cn', 'oops', 'java', 'javascript', 'react', 'node', 'mongodb', 'sql'];

const selectClass = 'flex h-10 rounded-xl border border-ink-100 bg-white px-3 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-signal-500 dark:bg-surface-dark-card dark:text-ink-100 dark:border-ink-700';

export function InterviewFilters({ filters, onChange, companies }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="relative flex-1 min-w-[180px]">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" size={15} />
        <Input placeholder="Search questions…" className="pl-9 h-10" value={filters.search} onChange={(e) => onChange({ search: e.target.value })} />
      </div>

      <select className={selectClass} value={filters.company} onChange={(e) => onChange({ company: e.target.value })}>
        <option value="">All companies</option>
        {companies.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>

      <select className={selectClass} value={filters.topic} onChange={(e) => onChange({ topic: e.target.value })}>
        <option value="">All topics</option>
        {TOPICS.map((t) => <option key={t} value={t}>{t.toUpperCase()}</option>)}
      </select>
    </div>
  );
}
