import jwt from 'jsonwebtoken';
import { AppError } from '../utils/errorHandler.js';
import UserModel from '../models/user.model.js';
import logger from '../utils/logger.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('Access denied. No token provided', 401));
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log('decoded ---> 23',decoded)

      // Check if user still exists
      const user = await UserModel.findById(decoded.userId);
      if (!user) {
        return next(new AppError('User no longer exists', 401));
      }

      // Attach user to request
      req.user = user;
      req.userId = decoded.userId;
      next();
    } catch (error) {
       console.log("JWT Verify Error:", error);
       console.log("JWT Secret:", process.env.JWT_SECRET);
      if (error.name === 'TokenExpiredError') {
        return next(new AppError('Token expired. Please login again', 401));
      }
      return next(new AppError('Invalid token', 401));
    }
  } catch (error) {
    next(error);
  }
};

// Restrict access based on roles (for future use)
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Please login first', 401));
    }

    // If user has role and it's in the allowed roles
    if (!roles.includes(req.user.role)) {
      return next(new AppError('Insufficient permissions', 403));
    }

    next();
  };
};

// Check if user is verified
export const requireVerified = async (req, res, next) => {
  if (!req.user.is_verified) {
    return next(new AppError('Please verify your email first', 403));
  }
  next();
};

// Optional auth (doesn't block if no token)
// export const optionalAuth = async (req, res, next) => {
//   try {
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//       const token = req.headers.authorization.split(' ')[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const user = await UserModel.findById(decoded.userId);
//       if (user) {
//         req.user = user;
//         req.userId = decoded.userId;
//       }
//     }
//     next();
//   } catch (error) {
//     // Continue even if token is invalid
//     next();
//   }
// };


export const authenticate = (req, res, next) => {

  console.log('req -----> 90', req)
  console.log('res ------> 91', res)

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access token is required."
    });
  }

  const token = authHeader.split(" ")[1];

  console.log('token -----> 104', token)

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('decoded ----> 110', decoded)

    req.user = decoded;

    console.log('req.user ----> 112', req.user)

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token."
    });

  }
};
