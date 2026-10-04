import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { FiMail, FiCheckCircle } from 'react-icons/fi';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FieldError } from '@/components/forms/FieldError';
import { forgotPasswordSchema } from '@/features/auth/authSchemas';
import { authService } from '@/services/authService';

export function ForgotPasswordForm() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = async ({ email }) => {
    setSubmitting(true);
    try {
      await authService.forgotPassword(email);
    } finally {
      setSubmitting(false);
      setSent(true); // always show the same state — don't reveal account existence
    }
  };

  if (sent) {
    return (
      <div className="text-center">
        <FiCheckCircle className="mx-auto text-status-success" size={40} />
        <h1 className="mt-4 font-display text-xl font-semibold text-ink-900 dark:text-ink-100">Check your inbox</h1>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-300">
          If an account exists for that email, a reset link is on its way.
        </p>
        <Link to="/login" className="mt-6 inline-block text-sm font-medium text-signal-500 hover:text-signal-600">
          ← Back to login
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-100">Reset your password</h1>
      <p className="mt-1.5 text-sm text-ink-500 dark:text-ink-300">
        Enter your email and we'll send you a reset link.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" size={16} />
            <Input id="email" type="email" placeholder="you@college.edu" className="pl-10" error={errors.email} {...register('email')} />
          </div>
          <FieldError>{errors.email?.message}</FieldError>
        </div>

        <Button type="submit" variant="gradient" className="w-full" disabled={submitting}>
          {submitting ? 'Sending…' : 'Send reset link'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-500 dark:text-ink-300">
        <Link to="/login" className="font-medium text-signal-500 hover:text-signal-600">
          ← Back to login
        </Link>
      </p>
    </div>
  );
}
