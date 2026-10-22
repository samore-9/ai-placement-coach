import { User } from '../models/User.js';
import { Profile } from '../models/Profile.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken, hashToken } from '../utils/tokens.js';
import { sendEmail } from './email/transporter.js';
import { verificationEmailTemplate, passwordResetEmailTemplate } from './email/templates.js';
import { verifyGoogleIdToken } from '../config/googleOAuth.js';
import { env } from '../config/env.js';

const issueTokenPair = async (user) => {
  const accessToken = signAccessToken(user._id.toString(), user.role);
  const refreshToken = signRefreshToken(user._id.toString());
  user.refreshTokenHash = hashToken(refreshToken);
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

export const registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(HTTP_STATUS.CONFLICT, 'An account with this email already exists');
  }

  const user = new User({ name, email, password, authProvider: 'local' });
  const rawVerificationToken = user.createEmailVerificationToken();
  await user.save();

  await Profile.create({ user: user._id });

  const verifyUrl = `${env.clientUrl}/verify-email?token=${rawVerificationToken}`;
  await sendEmail({
    to: user.email,
    subject: 'Verify your email — AI Placement Coach',
    html: verificationEmailTemplate(user.name, verifyUrl),
  });

  const tokens = await issueTokenPair(user);
  return { user: user.toSafeObject(), ...tokens };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || user.authProvider !== 'local' || !(await user.comparePassword(password))) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid email or password');
  }
  if (!user.isActive) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, 'This account has been deactivated');
  }

  const tokens = await issueTokenPair(user);
  return { user: user.toSafeObject(), ...tokens };
};

export const googleLogin = async (idToken) => {
  const payload = await verifyGoogleIdToken(idToken);
  if (!payload?.email) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Could not verify Google account');
  }

  let user = await User.findOne({ email: payload.email });

  if (!user) {
    user = await User.create({
      name: payload.name || payload.email.split('@')[0],
      email: payload.email,
      authProvider: 'google',
      googleId: payload.sub,
      avatar: payload.picture || '',
      isEmailVerified: !!payload.email_verified,
    });
    await Profile.create({ user: user._id, photoUrl: payload.picture || '' });
  } else if (user.authProvider !== 'google') {
    // Existing local account signing in with Google for the first time — link it
    user.authProvider = 'google';
    user.googleId = payload.sub;
    user.isEmailVerified = user.isEmailVerified || !!payload.email_verified;
    await user.save({ validateBeforeSave: false });
  }

  const tokens = await issueTokenPair(user);
  return { user: user.toSafeObject(), ...tokens };
};

export const refreshTokens = async (incomingRefreshToken) => {
  if (!incomingRefreshToken) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Refresh token missing');
  }

  let payload;
  try {
    payload = verifyRefreshToken(incomingRefreshToken);
  } catch {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid or expired refresh token');
  }

  const user = await User.findById(payload.sub).select('+refreshTokenHash');
  if (!user || user.refreshTokenHash !== hashToken(incomingRefreshToken)) {
    // Token reuse/mismatch — invalidate the session defensively
    if (user) {
      user.refreshTokenHash = undefined;
      await user.save({ validateBeforeSave: false });
    }
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Session expired, please log in again');
  }

  const tokens = await issueTokenPair(user); // rotate refresh token
  return { user: user.toSafeObject(), ...tokens };
};

export const logoutUser = async (userId) => {
  await User.findByIdAndUpdate(userId, { $unset: { refreshTokenHash: 1 } });
};

export const verifyEmail = async (rawToken) => {
  const tokenHash = hashToken(rawToken);
  const user = await User.findOne({
    emailVerificationToken: tokenHash,
    emailVerificationExpires: { $gt: Date.now() },
  }).select('+emailVerificationToken +emailVerificationExpires');

  if (!user) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Verification link is invalid or has expired');
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save({ validateBeforeSave: false });

  return user.toSafeObject();
};

export const resendVerificationEmail = async (email) => {
  const user = await User.findOne({ email });
  // Don't reveal whether the account exists
  if (!user || user.isEmailVerified) return;

  const rawToken = user.createEmailVerificationToken();
  await user.save({ validateBeforeSave: false });

  const verifyUrl = `${env.clientUrl}/verify-email?token=${rawToken}`;
  await sendEmail({
    to: user.email,
    subject: 'Verify your email — AI Placement Coach',
    html: verificationEmailTemplate(user.name, verifyUrl),
  });
};

export const forgotPassword = async (email) => {
  const user = await User.findOne({ email, authProvider: 'local' });
  if (!user) return; // don't leak account existence

  const rawToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${env.clientUrl}/reset-password?token=${rawToken}`;
  await sendEmail({
    to: user.email,
    subject: 'Reset your password — AI Placement Coach',
    html: passwordResetEmailTemplate(user.name, resetUrl),
  });
};

export const resetPassword = async (rawToken, newPassword) => {
  const tokenHash = hashToken(rawToken);
  const user = await User.findOne({
    passwordResetToken: tokenHash,
    passwordResetExpires: { $gt: Date.now() },
  }).select('+passwordResetToken +passwordResetExpires');

  if (!user) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Reset link is invalid or has expired');
  }

  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.refreshTokenHash = undefined; // force re-login everywhere
  await user.save();
};

export const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId).select('+password');
  if (!user || user.authProvider !== 'local') {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Password change is unavailable for this account');
  }
  if (!(await user.comparePassword(currentPassword))) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Current password is incorrect');
  }
  user.password = newPassword;
  await user.save();
};
