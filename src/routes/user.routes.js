// import express from 'express';
// import UserController from '../controllers/user.controller.js';
// import { protect } from '../middlewares/auth.middleware.js';
// import { rateLimit } from '../middlewares/rateLimiter.middleware.js';

// const router = express.Router();

// // All routes in this file require authentication
// router.use(protect);

// // Get user profile
// router.get('/profile', UserController.getProfile);

// // Update user profile
// router.patch('/profile', 
//   rateLimit({ max: 20 }),
//   UserController.updateProfile
// );

// // Delete account
// router.delete('/account', 
//   rateLimit({ max: 3 }),
//   UserController.deleteAccount
// );

// export default router;