import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FiCheckCircle, FiXCircle, FiLoader } from 'react-icons/fi';
import { authService } from '@/services/authService';
import { Button } from '@/components/ui/button';

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [state, setState] = useState('verifying'); // verifying | success | error

  useEffect(() => {
    if (!token) return setState('error');
    authService
      .verifyEmail(token)
      .then(() => setState('success'))
      .catch(() => setState('error'));
  }, [token]);

  return (
    <div className="text-center">
      {state === 'verifying' && (
        <>
          <FiLoader className="mx-auto animate-spin text-signal-500" size={40} />
          <h1 className="mt-4 font-display text-xl font-semibold">Verifying your email…</h1>
        </>
      )}
      {state === 'success' && (
        <>
          <FiCheckCircle className="mx-auto text-status-success" size={40} />
          <h1 className="mt-4 font-display text-xl font-semibold text-ink-900 dark:text-ink-100">Email verified</h1>
          <p className="mt-2 text-sm text-ink-500 dark:text-ink-300">You're all set. Head back to your dashboard.</p>
          <Link to="/dashboard"><Button className="mt-6" variant="gradient">Go to dashboard</Button></Link>
        </>
      )}
      {state === 'error' && (
        <>
          <FiXCircle className="mx-auto text-status-danger" size={40} />
          <h1 className="mt-4 font-display text-xl font-semibold text-ink-900 dark:text-ink-100">Link invalid or expired</h1>
          <p className="mt-2 text-sm text-ink-500 dark:text-ink-300">Request a new verification email from your profile.</p>
          <Link to="/login"><Button className="mt-6" variant="secondary">Back to login</Button></Link>
        </>
      )}
    </div>
  );
}
