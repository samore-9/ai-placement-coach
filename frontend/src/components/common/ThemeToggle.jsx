import { FiMoon, FiSun } from 'react-icons/fi';
import { useThemeStore } from '@/store/themeStore';

export function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink-100 text-ink-500 transition-colors hover:text-signal-500 hover:border-signal-300 dark:border-ink-700 dark:text-ink-300 ${className}`}
    >
      {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
}
