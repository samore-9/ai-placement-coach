import { NavLink } from 'react-router-dom';
import {
  FiHome, FiFileText, FiTarget, FiMap, FiCode, FiMessageSquare,
  FiBriefcase, FiTrendingUp, FiUser, FiMic, FiGitPullRequest,
} from 'react-icons/fi';
import { Logo } from '@/components/common/Logo';
import { cn } from '@/lib/utils';

const NAV_SECTIONS = [
  {
    items: [{ label: 'Overview', icon: FiHome, to: '/dashboard' }],
  },
  {
    title: 'Placement Prep',
    items: [
      { label: 'Resume Analyzer', icon: FiFileText, to: '/dashboard/resume' },
      { label: 'ATS Score', icon: FiTarget, to: '/dashboard/ats' },
      { label: 'Skill Gap Analysis', icon: FiGitPullRequest, to: '/dashboard/skill-gap' },
      { label: 'Career Roadmap', icon: FiMap, to: '/dashboard/roadmap' },
      { label: 'Coding Practice', icon: FiCode, to: '/dashboard/coding' },
      { label: 'Interview Prep', icon: FiMessageSquare, to: '/dashboard/interview' },
      { label: 'Mock Interview', icon: FiMic, to: '/dashboard/mock-interview' },
    ],
  },
  {
    title: 'Opportunities',
    items: [
      { label: 'Job Portal', icon: FiBriefcase, to: '/dashboard/jobs' },
      { label: 'Progress', icon: FiTrendingUp, to: '/dashboard/progress' },
    ],
  },
  {
    title: 'Account',
    items: [{ label: 'Profile', icon: FiUser, to: '/dashboard/profile' }],
  },
];

export function Sidebar({ className = '' }) {
  return (
    <aside className={cn('flex flex-col w-64 shrink-0 border-r border-ink-100 dark:border-ink-700/60 bg-white dark:bg-surface-dark-card', className)}>
      <div className="px-5 py-5">
        <Logo />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-6">
        {NAV_SECTIONS.map((section, i) => (
          <div key={i} className="mb-5">
            {section.title && (
              <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-300">
                {section.title}
              </p>
            )}
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/dashboard'}
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
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
