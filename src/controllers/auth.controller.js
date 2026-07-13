import AuthService from '../services/auth.service.js';
import { AppError } from '../utils/errorHandler.js';
import logger from '../utils/logger.js';

class AuthController {
  // Signup handler (Slack-style)
  static async signup(req, res, next) {
    try {
      // const { email,username, full_name, password, workspace_id } = req.body;
      const { email,username, full_name, password} = req.body;

      const result = await AuthService.signup({
        email,
        username,
        // full_name,
        password,
        // workspace_id,
      });

      // Set token in cookie for better security
      // this.setTokenCookie(res, result.token);
      AuthController.setTokenCookie(res, result.token);

      console.log('result -----> 24',result)

      res.status(201).json({
        success: true,
        message: 'Account created successfully',
        data: {
          user: result.user,
          token: result.token,     
          requires_verification: result.requires_verification,
          verification_token: result.verification_token,
        },
      });
    } catch (error) {
      next(error);
      console.log('Error -----> 36',error)
    }
  }

  // Signin handler
  static async signin(req, res, next) {
    try {
      const { email, password } = req.body;

      const result = await AuthService.signin(email, password);

      // Set token in cookie
      AuthController.setTokenCookie(res, result.token);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          user: result.user,
          token: result.token,   
          is_new_user: result.is_new_user,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // Get current user (protected route)
  static async getCurrentUser(req, res, next) {
    try {
      res.status(200).json({
        success: true,
        data: {
          user: req.user,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // Logout handler
  static async logout(req, res, next) {
    try {
      // Clear token cookie
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      res.status(200).json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  // Refresh token
  static async refreshToken(req, res, next) {
    try {
      const oldToken = req.headers.authorization?.split(' ')[1] || req.cookies.token;
      
      if (!oldToken) {
        throw new AppError('No token provided', 401);
      }

      const result = await AuthService.refreshToken(oldToken);
      this.setTokenCookie(res, result.token);

      res.status(200).json({
        success: true,
        data: { token: result.token },
      });
    } catch (error) {
      next(error);
    }
  }

  // Set token in HTTP-only cookie
  static setTokenCookie(res, token) {
    const isProduction = process.env.NODE_ENV === 'production';
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }
}

export default AuthController;