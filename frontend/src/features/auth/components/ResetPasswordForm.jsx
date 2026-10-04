import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiLock } from 'react-icons/fi';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FieldError } from '@/components/forms/FieldError';
import { resetPasswordSchema } from '@/features/auth/authSchemas';
import { authService } from '@/services/authService';

export function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(resetPasswordSchema) });

  const onSubmit = async ({ password }) => {
    if (!token) {
      toast.error('Reset link is missing or invalid');
      return;
    }
    setSubmitting(true);
    try {
      await authService.resetPassword(token, password);
      toast.success('Password reset — please log in');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'This reset link is invalid or has expired');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-100">Set a new password</h1>
      <p className="mt-1.5 text-sm text-ink-500 dark:text-ink-300">Make it something you haven't used before.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <div>
          <Label htmlFor="password">New password</Label>
          <div className="relative">
            <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" size={16} />
            <Input id="password" type="password" placeholder="••••••••" className="pl-10" error={errors.password} {...register('password')} />
          </div>
          <FieldError>{errors.password?.message}</FieldError>
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm new password</Label>
          <div className="relative">
            <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" size={16} />
            <Input id="confirmPassword" type="password" placeholder="••••••••" className="pl-10" error={errors.confirmPassword} {...register('confirmPassword')} />
          </div>
          <FieldError>{errors.confirmPassword?.message}</FieldError>
        </div>

        <Button type="submit" variant="gradient" className="w-full" disabled={submitting}>
          {submitting ? 'Resetting…' : 'Reset password'}
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
