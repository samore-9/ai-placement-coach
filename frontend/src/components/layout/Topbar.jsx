import { useState } from 'react';
import { FiBell, FiSearch, FiChevronDown, FiLogOut, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';

export function Topbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-ink-100 dark:border-ink-700/60 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md px-6 py-3.5">
      <div className="relative hidden sm:block w-full max-w-sm">
        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" size={16} />
        <input
          placeholder="Search jobs, questions, companies…"
          className="w-full rounded-xl border border-ink-100 dark:border-ink-700 bg-surface-light dark:bg-surface-dark-card py-2.5 pl-10 pr-3 text-sm placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-signal-500"
        />
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />

        <button
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-ink-100 dark:border-ink-700 text-ink-500 dark:text-ink-300 hover:text-signal-500"
        >
          <FiBell size={17} />
          <span className="absolute top-2 right-2.5 h-1.5 w-1.5 rounded-full bg-status-danger" />
        </button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 rounded-xl border border-ink-100 dark:border-ink-700 py-1.5 pl-1.5 pr-3 hover:border-signal-300"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-signal text-xs font-semibold text-white">
              {user?.name?.[0]?.toUpperCase() || 'S'}
            </span>
            <span className="hidden sm:block text-sm font-medium text-ink-700 dark:text-ink-100">
              {user?.name || 'Student'}
            </span>
            <FiChevronDown size={14} className="text-ink-300" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-ink-100 dark:border-ink-700 bg-white dark:bg-surface-dark-card shadow-card-hover py-1.5">
              <button
                onClick={() => { setMenuOpen(false); navigate('/dashboard/profile'); }}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-ink-700 dark:text-ink-100 hover:bg-ink-100/60 dark:hover:bg-white/5"
              >
                <FiUser size={15} /> Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-status-danger hover:bg-ink-100/60 dark:hover:bg-white/5"
              >
                <FiLogOut size={15} /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
