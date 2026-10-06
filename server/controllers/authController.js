// ============================================
// AUTH CONTROLLER - Authentication endpoints
// ============================================

const authService = require('../services/authService');
const otpService = require('../services/otpService');
const ApiResponse = require('../utils/response');

const authController = {
  /**
   * POST /api/auth/register
   * Register a new user
   */
  register: async (req, res, next) => {
    try {
      const firstName = req.body.firstName || req.body.FirstName;
      const lastName = req.body.lastName || req.body.LastName;
      const email = req.body.email || req.body.Email;
      const password = req.body.password || req.body.Password;
      const staffId = req.body.staffId || req.body.StaffID;

      // Validate required fields
      if (!firstName || !lastName || !email || !password) {
        const response = ApiResponse.validationError('First name, last name, email, and password are required');
        return res.status(response.statusCode).json(response.body);
      }

      // If confirmPassword is provided, verify match
      const confirmPassword = req.body.confirmPassword || req.body.ConfirmPassword;
      if (confirmPassword && password !== confirmPassword) {
        const response = ApiResponse.validationError('Passwords do not match');
        return res.status(response.statusCode).json(response.body);
      }

      // Register user
      const result = await authService.registerUser({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        password,
        staffId: staffId ? staffId.trim().toUpperCase() : undefined
      });

      const response = ApiResponse.success(
        201,
        result,
        'User registered successfully'
      );
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      if (error.status) {
        next(error);
      } else {
        console.error('Register error:', error);
        next({ status: 500, message: error.message || 'Registration failed', code: 'SERVER_ERROR' });
      }
    }
  },

  /**
   * POST /api/auth/login
   * Login user and return JWT token
   */
  login: async (req, res, next) => {
    try {
      const email = req.body.email || req.body.Email;
      const password = req.body.password || req.body.Password;

      // Validate required fields
      if (!email || !password) {
        const response = ApiResponse.validationError('Email and Password are required');
        return res.status(response.statusCode).json(response.body);
      }

      // Login user
      const result = await authService.loginUser(email.trim().toLowerCase(), password);

      const response = ApiResponse.success(
        200,
        result,
        'Login successful'
      );
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      if (error.status) {
        next(error);
      } else {
        console.error('Login error:', error);
        next({ status: 500, message: error.message || 'Login failed', code: 'SERVER_ERROR' });
      }
    }
  },

  /**
   * GET /api/auth/profile
   * Get current user profile (requires authentication)
   */
  getProfile: async (req, res, next) => {
    try {
      // req.user is attached by authMiddleware
      const userId = req.user.userId;

      const user = await authService.getUserProfile(userId);

      const response = ApiResponse.success(
        200,
        user,
        'User profile retrieved successfully'
      );
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      if (error.status) {
        next(error);
      } else {
        console.error('Get profile error:', error);
        next({ status: 500, message: 'Failed to retrieve profile', code: 'SERVER_ERROR' });
      }
    }
  },

  /**
   * DELETE /api/auth/account
   * Delete current user account (requires authentication & password verification)
   */
  deleteAccount: async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const password = req.body?.password || req.body?.Password || req.query?.password;

      if (!password) {
        const response = ApiResponse.validationError('Password is required to delete your account');
        return res.status(response.statusCode).json(response.body);
      }

      const result = await authService.deleteAccount(userId, password);

      const response = ApiResponse.success(
        200,
        result,
        'Account successfully deleted'
      );
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      if (error.status) {
        next(error);
      } else {
        console.error('Delete account error:', error);
        next({ status: 500, message: error.message || 'Failed to delete account', code: 'SERVER_ERROR' });
      }
    }
  },

  /**
   * PUT /api/auth/password
   * Change current user's password (requires authentication)
   */
  changePassword: async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const currentPassword = req.body?.currentPassword || req.body?.CurrentPassword;
      const newPassword = req.body?.newPassword || req.body?.NewPassword;

      if (!currentPassword || !newPassword) {
        const response = ApiResponse.validationError('Current password and new password are required');
        return res.status(response.statusCode).json(response.body);
      }

      if (newPassword.length < 6) {
        const response = ApiResponse.validationError('New password must be at least 6 characters long');
        return res.status(response.statusCode).json(response.body);
      }

      const result = await authService.changePassword(userId, currentPassword, newPassword);

      const response = ApiResponse.success(
        200,
        result,
        'Password changed successfully'
      );
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      if (error.status) {
        next(error);
      } else {
        console.error('Change password error:', error);
        next({ status: 500, message: error.message || 'Failed to change password', code: 'SERVER_ERROR' });
      }
    }
  },

  /**
   * POST /api/auth/send-otp
   * Generate and send email verification OTP (Public)
   */
  sendOTP: async (req, res, next) => {
    try {
      const email = req.body?.email || req.body?.Email;

      if (!email || !email.trim()) {
        const response = ApiResponse.validationError('Email address is required');
        return res.status(response.statusCode).json(response.body);
      }

      // Basic email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        const response = ApiResponse.validationError('Please enter a valid email address');
        return res.status(response.statusCode).json(response.body);
      }

      const result = await otpService.generateAndSendOTP(email.trim());

      const response = ApiResponse.success(
        200,
        result,
        'Verification code sent successfully'
      );
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      console.error('Send OTP error:', error);
      next({ status: 500, message: error.message || 'Failed to send verification code', code: 'SERVER_ERROR' });
    }
  },

  /**
   * POST /api/auth/verify-otp
   * Verify email OTP code (Public)
   */
  verifyOTP: async (req, res, next) => {
    try {
      const email = req.body?.email || req.body?.Email;
      const otp = req.body?.otp || req.body?.OTP || req.body?.code;

      if (!email || !otp) {
        const response = ApiResponse.validationError('Email and verification code are required');
        return res.status(response.statusCode).json(response.body);
      }

      const result = otpService.verifyOTP(email.trim(), otp);

      if (!result.verified) {
        const response = ApiResponse.error(400, result.message, 'INVALID_INPUT');
        return res.status(response.statusCode).json(response.body);
      }

      const response = ApiResponse.success(
        200,
        result,
        'Email verified successfully'
      );
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      console.error('Verify OTP error:', error);
      next({ status: 500, message: error.message || 'Verification failed', code: 'SERVER_ERROR' });
    }
  }
};

module.exports = authController;