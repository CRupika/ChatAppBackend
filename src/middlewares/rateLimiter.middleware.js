import { AppError } from '../utils/errorHandler.js';

class RateLimiter {
  constructor() {
    this.store = new Map();
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000); // Clean every minute
  }

  // Clean expired entries
  cleanup() {
    const now = Date.now();
    for (const [key, data] of this.store.entries()) {
      if (data.expires < now) {
        this.store.delete(key);
      }
    }
  }

  // Check rate limit
  checkLimit(key, limit, windowMs) {
    const now = Date.now();
    const data = this.store.get(key);

    if (!data) {
      this.store.set(key, {
        count: 1,
        expires: now + windowMs,
      });
      return { allowed: true, remaining: limit - 1 };
    }

    if (data.expires < now) {
      this.store.set(key, {
        count: 1,
        expires: now + windowMs,
      });
      return { allowed: true, remaining: limit - 1 };
    }

    if (data.count >= limit) {
      return { 
        allowed: false, 
        remaining: 0,
        resetTime: new Date(data.expires)
      };
    }

    data.count++;
    return { 
      allowed: true, 
      remaining: limit - data.count 
    };
  }
}

const rateLimiter = new RateLimiter();

// Create rate limit middleware
export const rateLimit = (options = {}) => {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes
    max = 100, // limit each IP to 100 requests per windowMs
    message = 'Too many requests, please try again later.',
    statusCode = 429,
  } = options;

  return (req, res, next) => {
    const key = req.ip || req.connection.remoteAddress;
    const result = rateLimiter.checkLimit(key, max, windowMs);

    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', max);
    res.setHeader('X-RateLimit-Remaining', result.remaining);

    if (result.resetTime) {
      res.setHeader('X-RateLimit-Reset', Math.ceil(result.resetTime.getTime() / 1000));
    }

    if (!result.allowed) {
      return next(new AppError(message, statusCode));
    }

    next();
  };
};

// Specific rate limiters for auth routes
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts per 15 minutes
  message: 'Too many authentication attempts. Please try again later.',
});

export const signupRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 signups per hour
  message: 'Too many signup attempts. Please try again later.',
});