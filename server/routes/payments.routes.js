// ============================================
// PAYMENTS ROUTES - Payment endpoints
// ============================================

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const paymentController = require('../controllers/paymentController');

/**
 * POST /api/payments/simulate
 * Process simulated payment
 * Body: { bookingId, amount, paymentMethod }
 */
router.post('/simulate', authMiddleware, paymentController.processPayment);

/**
 * GET /api/payments/:paymentId
 * Get payment details
 */
router.get('/:paymentId', authMiddleware, paymentController.getPaymentDetails);

module.exports = router;