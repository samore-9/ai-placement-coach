import { Outlet, Link } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { ThemeToggle } from '@/components/common/ThemeToggle';

export function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-surface-light dark:bg-surface-dark">
      {/* Form column */}
      <div className="flex flex-col px-6 py-8 sm:px-12">
        <div className="flex items-center justify-between">
          <Logo />
          <ThemeToggle />
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">
            <Outlet />
          </div>
        </div>

        <p className="text-center text-xs text-ink-300">
          <Link to="/" className="hover:text-signal-500">
            ← Back to home
          </Link>
        </p>
      </div>

      {/* Visual column */}
      <div className="hidden lg:flex relative items-center justify-center bg-gradient-signal overflow-hidden">
        <div className="absolute inset-0 opacity-[0.15]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />
        <div className="relative z-10 max-w-md px-10 text-white">
          <p className="font-mono text-sm text-white/70">placement_readiness.status</p>
          <p className="mt-2 font-display text-4xl font-semibold leading-tight">
            "Went from 40% ready to a Google interview call in 9 weeks."
          </p>
          <p className="mt-6 text-sm text-white/80">— Final-year student, tracked on AI Placement Coach</p>
        </div>
      </div>
    </div>
  );
}
