import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FieldError } from '@/components/forms/FieldError';
import { registerSchema } from '@/features/auth/authSchemas';
import { useAuth } from '@/hooks/useAuth';

export function RegisterForm() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = async ({ confirmPassword, ...values }) => {
    setSubmitting(true);
    try {
      await registerUser(values);
      toast.success('Account created — check your inbox to verify your email.');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not create your account');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-100">Start your prep</h1>
      <p className="mt-1.5 text-sm text-ink-500 dark:text-ink-300">Free — no credit card, ready in under a minute.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <div>
          <Label htmlFor="name">Full name</Label>
          <div className="relative">
            <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" size={16} />
            <Input id="name" placeholder="Priya Sharma" className="pl-10" error={errors.name} {...register('name')} />
          </div>
          <FieldError>{errors.name?.message}</FieldError>
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" size={16} />
            <Input id="email" type="email" placeholder="you@college.edu" className="pl-10" error={errors.email} {...register('email')} />
          </div>
          <FieldError>{errors.email?.message}</FieldError>
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" size={16} />
            <Input id="password" type="password" placeholder="••••••••" className="pl-10" error={errors.password} {...register('password')} />
          </div>
          <FieldError>{errors.password?.message}</FieldError>
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <div className="relative">
            <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" size={16} />
            <Input id="confirmPassword" type="password" placeholder="••••••••" className="pl-10" error={errors.confirmPassword} {...register('confirmPassword')} />
          </div>
          <FieldError>{errors.confirmPassword?.message}</FieldError>
        </div>

        <Button type="submit" variant="gradient" className="w-full" disabled={submitting}>
          {submitting ? 'Creating account…' : 'Create free account'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-500 dark:text-ink-300">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-signal-500 hover:text-signal-600">
          Log in
        </Link>
      </p>
    </div>
  );
}
