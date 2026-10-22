import { verifyAccessToken } from '../utils/tokens.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { User } from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Verifies the Bearer access token and attaches req.user
export const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Authentication required');
  }

  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch (err) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid or expired access token');
  }

  const user = await User.findById(payload.sub);
  if (!user || !user.isActive) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Account no longer active');
  }

  req.user = user; // full Mongoose doc; controllers use req.user._id / req.user.role
  next();
});

// Role guard - use after protect(): authorize('admin', 'superadmin')
export const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Authentication required'));
  }
  if (!allowedRoles.includes(req.user.role)) {
    return next(new ApiError(HTTP_STATUS.FORBIDDEN, 'You do not have permission to perform this action'));
  }
  next();
};
