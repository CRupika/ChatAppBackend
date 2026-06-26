import express from 'express';
import AuthController from '../controllers/auth.controller.js';
import { 
  validateSignup, 
  validateSignin,
  sanitizeInput,
  validateWorkspace
} from '../middlewares/validation.middleware.js';
import { 
  authRateLimit, 
  signupRateLimit 
} from '../middlewares/rateLimiter.middleware.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public routes with rate limiting
router.post('/signup', 
  // signupRateLimit,
  sanitizeInput,
  validateSignup,
  validateWorkspace,
  AuthController.signup
);

router.post('/signin',
  authRateLimit,
  sanitizeInput,
  validateSignin,
  AuthController.signin
);

router.post('/refresh-token',
  AuthController.refreshToken
);

// Protected routes (require authentication)
router.use(protect); // All routes below this will require authentication

router.get('/me', AuthController.getCurrentUser);
router.post('/logout', AuthController.logout);

export default router;