import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import UserModel from '../models/user.model.js';
import { AppError } from '../utils/errorHandler.js';
import logger from '../utils/logger.js';

class AuthService {
  // Signup logic (Slack-style)
  static async signup(userData) {
    // const { email,username, full_name, password, workspace_id } = userData;
    const { email,password } = userData;

    // Check if user exists
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      throw new AppError('This email is already registered', 409);
    }

    // Hash password
    const saltRounds = 12;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = await UserModel.create({
      email,
      // username, 
      // full_name,
      password_hash,
      // workspace_id,
    });

    // Generate verification token
    const verificationToken = this.generateVerificationToken(newUser.id);

    // Generate JWT for immediate access
    const token = this.generateToken(newUser.id, newUser.email);

    // Log signup
    logger.info(`New user registered: ${email}`);

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        // full_name: newUser.full_name,
        // workspace_id: newUser.workspace_id,
        is_verified: newUser.is_verified,
        created_at: newUser.created_at,
      },
      token,
      requires_verification: !newUser.is_verified,
      verification_token: verificationToken,
    };
  }

  // Signin logic
  static async signin(email, password) {
    // Find user
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    // Check if account is locked
    if (user.locked_until && new Date(user.locked_until) > new Date()) {
      const remainingMinutes = Math.ceil(
        (new Date(user.locked_until) - new Date()) / (1000 * 60)
      );
      throw new AppError(
        `Account locked. Try again in ${remainingMinutes} minutes`,
        403
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      // Increment login attempts
      const attempts = (user.login_attempts || 0) + 1;
      await UserModel.updateLoginAttempts(email, attempts);

      const remainingAttempts = 5 - attempts;
      throw new AppError(
        remainingAttempts > 0
          ? `Invalid credentials. ${remainingAttempts} attempts remaining`
          : 'Account locked. Too many failed attempts',
        401
      );
    }

    // Reset login attempts and update last login
    const updatedUser = await UserModel.resetLoginAttempts(email);

    // Generate JWT
    const token = this.generateToken(user.id, user.email);

    logger.info(`User logged in: ${email}`);

    return {
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        full_name: updatedUser.full_name,
        workspace_id: updatedUser.workspace_id,
        is_verified: updatedUser.is_verified,
        last_login: updatedUser.last_login,
      },
      token,
      is_new_user: !updatedUser.last_login,
    };
  }

  // Generate JWT Token
  static generateToken(userId, email) {
    return jwt.sign(
      { 
        userId, 
        email,
        iat: Math.floor(Date.now() / 1000)
      },
      process.env.JWT_SECRET,
      { 
        expiresIn: process.env.JWT_EXPIRY || '7d',
        algorithm: 'HS256'
      }
    );
  }

  // Generate verification token
  static generateVerificationToken(userId) {
    return crypto
      .createHash('sha256')
      .update(`${userId}-${Date.now()}-${process.env.JWT_SECRET}`)
      .digest('hex')
      .substring(0, 32);
  }

  // Verify user email
  static async verifyEmail(token) {
    // Implementation would validate token and verify user
    // This is a simplified version
    return { success: true, message: 'Email verified' };
  }

  // Refresh token
  static async refreshToken(oldToken) {
    try {
      const decoded = jwt.verify(oldToken, process.env.JWT_SECRET);
      const user = await UserModel.findById(decoded.userId);
      
      if (!user) {
        throw new AppError('User not found', 404);
      }

      const newToken = this.generateToken(user.id, user.email);
      return { token: newToken };
    } catch (error) {
      throw new AppError('Invalid or expired token', 401);
    }
  }
}

export default AuthService;