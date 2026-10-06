const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const adminController = require('../controllers/adminController');

router.use(authMiddleware);
router.use(authorize('Admin'));

router.get('/dashboard', adminController.getDashboard);
router.get('/revenue', adminController.getRevenueStats);
router.get('/flights', adminController.getFlightStats);
router.get('/bookings', adminController.getBookingStats);
router.get('/users', adminController.getUserStats);

// Staff Registry & Crew Management
router.get('/staff', adminController.getStaffRegistry);
router.post('/staff', adminController.createStaffId);
router.delete('/staff/:staffId', adminController.deleteStaffId);
router.get('/staff-users', adminController.getStaffUsers);

module.exports = router;