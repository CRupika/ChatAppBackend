import logger from './logger.js';

export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Log error
  logger.error(`${err.statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // Development vs Production error response
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  } else {
    // Production error response
    let errorMessage = err.message;
    let statusCode = err.statusCode;

    // Handle specific error types
    if (err.name === 'JsonWebTokenError') {
      errorMessage = 'Invalid token';
      statusCode = 401;
    }

    if (err.name === 'TokenExpiredError') {
      errorMessage = 'Token expired';
      statusCode = 401;
    }

    if (err.name === 'SequelizeValidationError') {
      errorMessage = err.errors.map(e => e.message).join(', ');
      statusCode = 400;
    }

    res.status(statusCode).json({
      success: false,
      status: err.status,
      message: errorMessage,
      ...(err.isOperational ? {} : { message: 'Something went wrong' }),
    });
  }
};

export const notFoundHandler = (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
};

// Async wrapper to avoid try-catch repetition
export const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};