import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface-light dark:bg-surface-dark px-6 text-center">
      <p className="font-mono text-sm text-status-danger">error_403</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-ink-900 dark:text-ink-100">Access denied</h1>
      <p className="mt-3 max-w-sm text-sm text-ink-500 dark:text-ink-300">
        You don't have permission to view this page.
      </p>
      <Link to="/dashboard"><Button className="mt-8" variant="gradient">Back to dashboard</Button></Link>
    </div>
  );
}
