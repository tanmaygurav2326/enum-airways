// ============================================
// AUTH ROUTES - Authentication endpoints
// ============================================

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

/**
 * Public routes (no authentication required)
 */

/**
 * POST /api/auth/register
 * Register a new user
 * Body: { FirstName, LastName, Email, Password, ConfirmPassword }
 */
router.post('/register', authController.register);

/**
 * POST /api/auth/login
 * Login user
 * Body: { Email, Password }
 */
router.post('/login', authController.login);

/**
 * POST /api/auth/send-otp
 * Generate and send email verification OTP
 * Body: { email }
 */
router.post('/send-otp', authController.sendOTP);

/**
 * POST /api/auth/verify-otp
 * Verify email OTP code
 * Body: { email, otp }
 */
router.post('/verify-otp', authController.verifyOTP);

/**
 * Protected routes (authentication required)
 */

/**
 * GET /api/auth/profile
 * Get current user profile
 * Headers: { Authorization: 'Bearer <token>' }
 */
router.get('/profile', authMiddleware, authController.getProfile);
router.get('/me', authMiddleware, authController.getProfile);

/**
 * PUT /api/auth/password
 * Change current user password
 * Headers: { Authorization: 'Bearer <token>' }
 * Body: { currentPassword, newPassword }
 */
router.put('/password', authMiddleware, authController.changePassword);

/**
 * DELETE /api/auth/account
 * Delete current user account
 * Headers: { Authorization: 'Bearer <token>' }
 * Body: { password: '<current_password>' }
 */
router.delete('/account', authMiddleware, authController.deleteAccount);
router.post('/account/delete', authMiddleware, authController.deleteAccount);

module.exports = router;