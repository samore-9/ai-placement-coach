import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { env } from '../config/env.js';

export const signAccessToken = (userId, role) =>
  jwt.sign({ sub: userId, role }, env.jwt.accessSecret, { expiresIn: env.jwt.accessExpiresIn });

export const signRefreshToken = (userId) =>
  jwt.sign({ sub: userId }, env.jwt.refreshSecret, { expiresIn: env.jwt.refreshExpiresIn });

export const verifyAccessToken = (token) => jwt.verify(token, env.jwt.accessSecret);

export const verifyRefreshToken = (token) => jwt.verify(token, env.jwt.refreshSecret);

// We never store the raw refresh token in the DB — only its hash, so a DB
// leak can't be replayed as a valid refresh token.
export const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');
