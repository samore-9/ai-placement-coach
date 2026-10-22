import { OAuth2Client } from 'google-auth-library';
import { env } from './env.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

const client = new OAuth2Client(env.google.clientId);

/**
 * Verifies a Google ID token sent from the frontend (Google Identity Services)
 * and returns the trusted payload: { sub, email, name, picture, email_verified }
 */
export const verifyGoogleIdToken = async (idToken) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: env.google.clientId,
    });
    return ticket.getPayload();
  } catch (error) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid Google token');
  }
};
