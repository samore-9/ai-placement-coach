import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { Logo } from '@/components/common/Logo';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Companies', href: '#companies' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? 'bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-ink-100 dark:border-ink-700/60'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo />

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-500 hover:text-signal-500 dark:text-ink-300 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          {isAuthenticated ? (
            <Button size="sm" onClick={() => navigate('/dashboard')}>
              Dashboard
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                Log in
              </Button>
              <Button variant="gradient" size="sm" onClick={() => navigate('/register')}>
                Start free
              </Button>
            </>
          )}
        </div>

        <button className="md:hidden text-ink-700 dark:text-ink-100" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-ink-100 dark:border-ink-700/60 bg-white dark:bg-surface-dark px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-ink-700 dark:text-ink-100" onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-3 pt-2">
            <Link to="/login" className="flex-1">
              <Button variant="secondary" size="sm" className="w-full">Log in</Button>
            </Link>
            <Link to="/register" className="flex-1">
              <Button variant="gradient" size="sm" className="w-full">Start free</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
