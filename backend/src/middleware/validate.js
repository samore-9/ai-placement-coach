import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

/**
 * @param {import('zod').ZodSchema} schema
 * @param {'body'|'query'|'params'} source
 */
export const validate = (schema, source = 'body') => (req, res, next) => {
  const result = schema.safeParse(req[source]);
  if (!result.success) {
    const details = result.error.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return next(new ApiError(HTTP_STATUS.UNPROCESSABLE_ENTITY, 'Validation failed', details));
  }
  req[source] = result.data;
  next();
};
