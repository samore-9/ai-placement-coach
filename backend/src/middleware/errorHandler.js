import { env } from '../config/env.js';
import { logger } from '../config/logger.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Internal Server Error';
  let details = err.details || null;

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = `Invalid value for field: ${err.path}`;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = HTTP_STATUS.UNPROCESSABLE_ENTITY;
    message = 'Validation failed';
    details = Object.values(err.errors).map((e) => e.message);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    statusCode = HTTP_STATUS.CONFLICT;
    const field = Object.keys(err.keyValue || {})[0];
    message = `${field ? field.charAt(0).toUpperCase() + field.slice(1) : 'Field'} already exists`;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = 'Invalid authentication token';
  }
  if (err.name === 'TokenExpiredError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = 'Authentication token expired';
  }

  if (statusCode >= 500) {
    logger.error(`${req.method} ${req.originalUrl} -> ${message}\n${err.stack}`);
  } else {
    logger.warn(`${req.method} ${req.originalUrl} -> ${message}`);
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    details,
    ...(env.nodeEnv === 'development' && { stack: err.stack }),
  });
};
