import { z } from 'zod';

const passwordRule = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain an uppercase letter')
  .regex(/[a-z]/, 'Password must contain a lowercase letter')
  .regex(/[0-9]/, 'Password must contain a number');

export const registerSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().toLowerCase().email('Invalid email address'),
  password: passwordRule,
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional().default(false),
});

export const googleAuthSchema = z.object({
  idToken: z.string().min(10, 'Google ID token is required'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email('Invalid email address'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(10, 'Reset token is required'),
  password: passwordRule,
});

export const verifyEmailSchema = z.object({
  token: z.string().min(10, 'Verification token is required'),
});

export const resendVerificationSchema = z.object({
  email: z.string().trim().toLowerCase().email('Invalid email address'),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: passwordRule,
});
