import { NavLink } from 'react-router-dom';
import { FiGrid, FiUsers, FiBriefcase, FiHome, FiCode, FiMessageSquare, FiBell } from 'react-icons/fi';
import { Logo } from '@/components/common/Logo';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Overview', icon: FiGrid, to: '/admin' },
  { label: 'Users', icon: FiUsers, to: '/admin/users' },
  { label: 'Jobs', icon: FiBriefcase, to: '/admin/jobs' },
  { label: 'Companies', icon: FiHome, to: '/admin/companies' },
  { label: 'Coding Questions', icon: FiCode, to: '/admin/coding-questions' },
  { label: 'Interview Questions', icon: FiMessageSquare, to: '/admin/interview-questions' },
  { label: 'Announcements', icon: FiBell, to: '/admin/announcements' },
];

export function AdminSidebar({ className = '' }) {
  return (
    <aside className={cn('flex flex-col w-64 shrink-0 border-r border-ink-100 dark:border-ink-700/60 bg-white dark:bg-surface-dark-card', className)}>
      <div className="px-5 py-5">
        <Logo to="/admin" />
        <span className="mt-1 inline-block rounded-md bg-streak-400/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase text-streak-500">
          Admin
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3 pb-6">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/admin'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-signal-50 text-signal-600 dark:bg-signal-900/40 dark:text-signal-300'
                  : 'text-ink-500 hover:bg-ink-100/60 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-white/5'
              )
            }
          >
            <item.icon size={17} />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
