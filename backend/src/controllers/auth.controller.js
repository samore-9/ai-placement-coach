import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { setRefreshTokenCookie, clearRefreshTokenCookie, REFRESH_COOKIE_NAME } from '../utils/cookies.js';
import * as authService from '../services/auth.service.js';

const sendAuthResponse = (res, statusCode, { user, accessToken, refreshToken }, message) => {
  setRefreshTokenCookie(res, refreshToken);
  res.status(statusCode).json(new ApiResponse(statusCode, { user, accessToken }, message));
};

export const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);
  sendAuthResponse(res, HTTP_STATUS.CREATED, result, 'Registration successful. Please verify your email.');
});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body);
  sendAuthResponse(res, HTTP_STATUS.OK, result, 'Login successful');
});

export const googleAuth = asyncHandler(async (req, res) => {
  const result = await authService.googleLogin(req.body.idToken);
  sendAuthResponse(res, HTTP_STATUS.OK, result, 'Google login successful');
});

export const refresh = asyncHandler(async (req, res) => {
  const incoming = req.cookies?.[REFRESH_COOKIE_NAME];
  const result = await authService.refreshTokens(incoming);
  sendAuthResponse(res, HTTP_STATUS.OK, result, 'Token refreshed');
});

export const logout = asyncHandler(async (req, res) => {
  if (req.user) await authService.logoutUser(req.user._id);
  clearRefreshTokenCookie(res);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, null, 'Logged out successfully'));
});

export const getMe = asyncHandler(async (req, res) => {
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, req.user.toSafeObject(), 'Current user'));
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const user = await authService.verifyEmail(req.body.token);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, user, 'Email verified successfully'));
});

export const resendVerification = asyncHandler(async (req, res) => {
  await authService.resendVerificationEmail(req.body.email);
  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, null, 'If an account exists, a verification email has been sent.'));
});

export const forgotPassword = asyncHandler(async (req, res) => {
  await authService.forgotPassword(req.body.email);
  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, null, 'If an account exists, a password reset email has been sent.'));
});

export const resetPassword = asyncHandler(async (req, res) => {
  await authService.resetPassword(req.body.token, req.body.password);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, null, 'Password reset successful. Please log in.'));
});

export const changePassword = asyncHandler(async (req, res) => {
  await authService.changePassword(req.user._id, req.body.currentPassword, req.body.newPassword);
  res.status(HTTP_STATUS.OK).json(new ApiResponse(HTTP_STATUS.OK, null, 'Password changed successfully'));
});
