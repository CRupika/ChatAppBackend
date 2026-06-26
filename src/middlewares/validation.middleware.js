import { AppError } from '../utils/errorHandler.js';
import validator from 'validator';

// Validate signup (Slack-style)
export const validateSignup = (req, res, next) => {
  const { email, full_name, password } = req.body;

  const errors = [];

  // Email validation
  if (!email) {
    errors.push('Email is required');
  } else if (!validator.isEmail(email)) {
    errors.push('Please provide a valid email address');
  } else if (email.length > 255) {
    errors.push('Email is too long');
  }

  // Password validation (Slack-style requirements)
  // if (!password) {
  //   errors.push('Password is required');
  // } else {
  //   if (password.length < 8) {
  //     errors.push('Password must be at least 8 characters');
  //   }
  //   if (password.length > 128) {
  //     errors.push('Password is too long');
  //   }
  //   if (!/[A-Z]/.test(password)) {
  //     errors.push('Password must contain at least one uppercase letter');
  //   }
  //   if (!/[a-z]/.test(password)) {
  //     errors.push('Password must contain at least one lowercase letter');
  //   }
  //   if (!/[0-9]/.test(password)) {
  //     errors.push('Password must contain at least one number');
  //   }
  //   if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
  //     errors.push('Password must contain at least one special character');
  //   }
  // }

  // Full name validation
  // if (full_name && full_name.length > 100) {
  //   errors.push('Full name is too long');
  // }

  if (errors.length > 0) {
    return next(new AppError(errors.join('; '), 400));
  }

  next();
};

// Validate signin
export const validateSignin = (req, res, next) => {
  const { email, password } = req.body;

  const errors = [];

  if (!email) {
    errors.push('Email is required');
  } else if (!validator.isEmail(email)) {
    errors.push('Please provide a valid email');
  }

  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return next(new AppError(errors.join('; '), 400));
  }

  next();
};

// Sanitize input
export const sanitizeInput = (req, res, next) => {
  if (req.body.email) {
    req.body.email = validator.normalizeEmail(req.body.email) || req.body.email;
    req.body.email = validator.trim(req.body.email);
  }
  
  if (req.body.full_name) {
    req.body.full_name = validator.escape(validator.trim(req.body.full_name));
  }

  next();
};

// Validate workspace_id (for workspace creation)
export const validateWorkspace = (req, res, next) => {
  const { workspace_name, workspace_url } = req.body;

  const errors = [];

  if (workspace_name) {
    if (workspace_name.length < 2 || workspace_name.length > 100) {
      errors.push('Workspace name must be between 2 and 100 characters');
    }
    if (!/^[a-zA-Z0-9\s\-_]+$/.test(workspace_name)) {
      errors.push('Workspace name contains invalid characters');
    }
  }

  if (workspace_url) {
    if (!/^[a-z0-9\-]+$/.test(workspace_url)) {
      errors.push('Workspace URL must contain only lowercase letters, numbers, and hyphens');
    }
    if (workspace_url.length < 3 || workspace_url.length > 63) {
      errors.push('Workspace URL must be between 3 and 63 characters');
    }
  }

  if (errors.length > 0) {
    return next(new AppError(errors.join('; '), 400));
  }

  next();
};

// Request validation middleware
export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(new AppError(error.details[0].message, 400));
    }
    next();
  };
};