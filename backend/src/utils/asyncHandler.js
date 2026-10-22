// Wraps async route handlers so rejected promises are forwarded to errorHandler
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
