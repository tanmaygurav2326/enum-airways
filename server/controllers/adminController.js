// ============================================
// ADMIN CONTROLLER - Admin analytics endpoints
// ============================================

const adminService = require('../services/adminService');
const ApiResponse = require('../utils/response');

const adminController = {
  /**
   * GET /api/admin/dashboard
   * Get comprehensive dashboard statistics (admin only)
   */
  getDashboard: async (req, res, next) => {
    try {
      const stats = await adminService.getDashboardStats();

      const response = ApiResponse.success(
        200,
        stats,
        'Dashboard statistics retrieved successfully'
      );
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      if (error.status) {
        next(error);
      } else {
        console.error('Get dashboard error:', error);
        next({ status: 500, message: 'Failed to retrieve dashboard', code: 'SERVER_ERROR' });
      }
    }
  },

  /**
   * GET /api/admin/revenue
   * Get revenue statistics (admin only)
   */
  getRevenueStats: async (req, res, next) => {
    try {
      const stats = await adminService.getRevenueStats();

      const response = ApiResponse.success(
        200,
        stats,
        'Revenue statistics retrieved successfully'
      );
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      if (error.status) {
        next(error);
      } else {
        console.error('Get revenue stats error:', error);
        next({ status: 500, message: 'Failed to retrieve statistics', code: 'SERVER_ERROR' });
      }
    }
  },

  /**
   * GET /api/admin/flights
   * Get flight statistics (admin only)
   */
  getFlightStats: async (req, res, next) => {
    try {
      const stats = await adminService.getFlightStats();

      const response = ApiResponse.success(
        200,
        stats,
        'Flight statistics retrieved successfully'
      );
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      if (error.status) {
        next(error);
      } else {
        console.error('Get flight stats error:', error);
        next({ status: 500, message: 'Failed to retrieve statistics', code: 'SERVER_ERROR' });
      }
    }
  },

  /**
   * GET /api/admin/bookings
   * Get booking statistics (admin only)
   */
  getBookingStats: async (req, res, next) => {
    try {
      const stats = await adminService.getBookingStats();

      const response = ApiResponse.success(
        200,
        stats,
        'Booking statistics retrieved successfully'
      );
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      if (error.status) {
        next(error);
      } else {
        console.error('Get booking stats error:', error);
        next({ status: 500, message: 'Failed to retrieve statistics', code: 'SERVER_ERROR' });
      }
    }
  },

  /**
   * GET /api/admin/users
   * Get user statistics (admin only)
   */
  getUserStats: async (req, res, next) => {
    try {
      const stats = await adminService.getUserStats();

      const response = ApiResponse.success(
        200,
        stats,
        'User statistics retrieved successfully'
      );
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      if (error.status) {
        next(error);
      } else {
        console.error('Get user stats error:', error);
        next({ status: 500, message: 'Failed to retrieve statistics', code: 'SERVER_ERROR' });
      }
    }
  },

  /**
   * GET /api/admin/staff
   * List all Staff IDs and their assignment status (admin only)
   */
  getStaffRegistry: async (req, res, next) => {
    try {
      const staff = await adminService.getStaffRegistry();

      const response = ApiResponse.success(
        200,
        staff,
        `Retrieved ${staff.length} staff registry records`
      );
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      if (error.status) {
        next(error);
      } else {
        console.error('Get staff registry error:', error);
        next({ status: 500, message: 'Failed to retrieve staff registry', code: 'SERVER_ERROR' });
      }
    }
  },

  /**
   * POST /api/admin/staff
   * Create a new Staff ID (admin only)
   */
  createStaffId: async (req, res, next) => {
    try {
      const staffId = req.body.staffId || req.body.StaffID;

      if (!staffId) {
        const response = ApiResponse.validationError('Staff ID is required (e.g. EA-STF021)');
        return res.status(response.statusCode).json(response.body);
      }

      const result = await adminService.createStaffId(staffId);

      const response = ApiResponse.success(
        201,
        result,
        `Staff ID ${result.staffId} created successfully`
      );
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      if (error.status) {
        next(error);
      } else {
        console.error('Create staff ID error:', error);
        next({ status: 500, message: error.message || 'Failed to create Staff ID', code: 'SERVER_ERROR' });
      }
    }
  },

  /**
   * DELETE /api/admin/staff/:staffId
   * Delete an unassigned Staff ID (admin only)
   */
  deleteStaffId: async (req, res, next) => {
    try {
      const { staffId } = req.params;

      if (!staffId) {
        const response = ApiResponse.validationError('Staff ID is required');
        return res.status(response.statusCode).json(response.body);
      }

      const result = await adminService.deleteStaffId(staffId);

      const response = ApiResponse.success(
        200,
        result,
        result.message
      );
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      if (error.status) {
        next(error);
      } else {
        console.error('Delete staff ID error:', error);
        next({ status: 500, message: error.message || 'Failed to delete Staff ID', code: 'SERVER_ERROR' });
      }
    }
  },

  /**
   * GET /api/admin/staff-users
   * List all users with Staff or Admin role (admin only)
   */
  getStaffUsers: async (req, res, next) => {
    try {
      const staffUsers = await adminService.getStaffUsers();

      const response = ApiResponse.success(
        200,
        staffUsers,
        `Retrieved ${staffUsers.length} staff users`
      );
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      if (error.status) {
        next(error);
      } else {
        console.error('Get staff users error:', error);
        next({ status: 500, message: 'Failed to retrieve staff users', code: 'SERVER_ERROR' });
      }
    }
  }
};

module.exports = adminController;