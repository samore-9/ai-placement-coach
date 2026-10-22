import { env } from '../config/env.js';

const REFRESH_COOKIE_NAME = 'refreshToken';

const baseOptions = () => ({
  httpOnly: true,
  secure: env.cookie.secure,
  sameSite: env.cookie.sameSite,
  path: `/api/${env.apiVersion}/auth`,
});

export const setRefreshTokenCookie = (res, token) => {
  res.cookie(REFRESH_COOKIE_NAME, token, {
    ...baseOptions(),
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export const clearRefreshTokenCookie = (res) => {
  res.clearCookie(REFRESH_COOKIE_NAME, baseOptions());
};

export { REFRESH_COOKIE_NAME };