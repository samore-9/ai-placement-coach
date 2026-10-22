import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { validate } from '../../middleware/validate.js';
import { protect } from '../../middleware/auth.js';
import {
  registerSchema,
  loginSchema,
  googleAuthSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  resendVerificationSchema,
  changePasswordSchema,
} from '../../validators/auth.validator.js';
import * as authController from '../../controllers/auth.controller.js';

const router = Router();

// Stricter limiter for brute-force-sensitive endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many attempts. Please try again later.' },
});

// ---------- Public ----------
router.post('/register', authLimiter, validate(registerSchema), authController.register);
router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.post('/google', authLimiter, validate(googleAuthSchema), authController.googleAuth);
router.post('/refresh-token', authController.refresh);

router.post('/verify-email', validate(verifyEmailSchema), authController.verifyEmail);
router.post('/resend-verification', authLimiter, validate(resendVerificationSchema), authController.resendVerification);

router.post('/forgot-password', authLimiter, validate(forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', authLimiter, validate(resetPasswordSchema), authController.resetPassword);

// ---------- Protected ----------
router.post('/logout', protect, authController.logout);
router.get('/me', protect, authController.getMe);
router.post('/change-password', protect, validate(changePasswordSchema), authController.changePassword);

export default router;
