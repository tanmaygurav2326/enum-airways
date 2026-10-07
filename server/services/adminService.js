// ============================================
// ADMIN SERVICE - Admin analytics & management
// ============================================

const { executeQuery } = require('../db');
const { ERROR_CODES } = require('../utils/constants');

const adminService = {
  /**
   * Get revenue statistics
   * @returns {Promise<object>}
   */
  getRevenueStats: async () => {
    try {
      // Total revenue
      const totalRevenue = await executeQuery(
        `SELECT SUM(Amount) as TotalRevenue FROM Payments WHERE TransactionStatus = 'Success'`
      );

      // Revenue by payment method
      const revenueByMethod = await executeQuery(
        `SELECT PaymentMethod, SUM(Amount) as Revenue, COUNT(*) as TransactionCount
         FROM Payments
         WHERE TransactionStatus = 'Success'
         GROUP BY PaymentMethod`
      );

      // Revenue by airline class
      const revenueByClass = await executeQuery(
        `SELECT T.Class, SUM(T.TicketPrice) as Revenue, COUNT(*) as TicketCount
         FROM Tickets T
         JOIN Bookings B ON T.BookingID = B.BookingID
         JOIN Payments P ON B.BookingID = P.BookingID
         WHERE P.TransactionStatus = 'Success'
         GROUP BY T.Class`
      );

      return {
        totalRevenue: totalRevenue[0]?.TOTALREVENUE || 0,
        revenueByMethod: (revenueByMethod || []).map(r => ({
          paymentMethod: r.PAYMENTMETHOD,
          revenue: r.REVENUE,
          transactionCount: r.TRANSACTIONCOUNT
        })),
        revenueByClass: (revenueByClass || []).map(r => ({
          cabinClass: r.CLASS,
          revenue: r.REVENUE,
          ticketCount: r.TICKETCOUNT
        }))
      };
    } catch (error) {
      console.error('Get revenue stats error:', error.message);
      throw {
        status: 500,
        message: 'Failed to retrieve revenue statistics',
        code: ERROR_CODES.DATABASE_ERROR
      };
    }
  },

  /**
   * Get flight statistics
   * @returns {Promise<object>}
   */
  getFlightStats: async () => {
    try {
      // Flight count by status
      const flightsByStatus = await executeQuery(
        `SELECT Status, COUNT(*) as Count FROM Flights GROUP BY Status`
      );

      // Occupancy by flight
      const occupancy = await executeQuery(
        `SELECT F.FlightNumber, F.FlightID,
                A.TotalSeats,
                (SELECT COUNT(*) FROM Tickets T JOIN Bookings B ON T.BookingID = B.BookingID WHERE T.FlightID = F.FlightID AND B.Status != 'Cancelled') as OccupiedSeats,
                ROUND(100 * (SELECT COUNT(*) FROM Tickets T JOIN Bookings B ON T.BookingID = B.BookingID WHERE T.FlightID = F.FlightID AND B.Status != 'Cancelled') / GREATEST(A.TotalSeats, 1), 2) as OccupancyRate
         FROM Flights F
         JOIN Aircraft A ON F.AircraftID = A.AircraftID
         ORDER BY OccupancyRate DESC`
      );

      // Total aircraft utilization
      const totalSeats = await executeQuery(
        `SELECT SUM(TotalSeats) as TotalSeats FROM Aircraft`
      );

      const occupiedSeats = await executeQuery(
        `SELECT COUNT(*) as OccupiedSeats FROM Tickets T JOIN Bookings B ON T.BookingID = B.BookingID WHERE B.Status != 'Cancelled'`
      );

      const total = totalSeats[0]?.TOTALSEATS || 0;
      const occupied = occupiedSeats[0]?.OCCUPIEDSEATS || 0;
      const overallOccupancy = total > 0 ? Math.round((occupied / total) * 100 * 100) / 100 : 0;

      return {
        flightsByStatus: (flightsByStatus || []).map(f => ({
          status: f.STATUS,
          count: f.COUNT
        })),
        flightOccupancy: (occupancy || []).map(o => ({
          flightNumber: o.FLIGHTNUMBER,
          flightId: o.FLIGHTID,
          totalSeats: o.TOTALSEATS,
          occupiedSeats: o.OCCUPIEDSEATS,
          occupancyRate: o.OCCUPANCYRATE || 0
        })),
        overallOccupancy: {
          totalSeats: total,
          occupiedSeats: occupied,
          occupancyRate: overallOccupancy
        }
      };
    } catch (error) {
      console.error('Get flight stats error:', error.message);
      throw {
        status: 500,
        message: 'Failed to retrieve flight statistics',
        code: ERROR_CODES.DATABASE_ERROR
      };
    }
  },

  /**
   * Get booking statistics
   * @returns {Promise<object>}
   */
  getBookingStats: async () => {
    try {
      // Bookings by status
      const bookingsByStatus = await executeQuery(
        `SELECT Status, COUNT(*) as Count FROM Bookings GROUP BY Status`
      );

      // Average booking value
      const avgBooking = await executeQuery(
        `SELECT AVG(TotalPrice) as AvgPrice FROM (
          SELECT SUM(TicketPrice) as TotalPrice
          FROM Tickets
          GROUP BY BookingID
        )`
      );

      // Total bookings and passengers
      const totalBookings = await executeQuery(
        `SELECT COUNT(*) as BookingCount, COUNT(DISTINCT UserID) as UniqueUsers FROM Bookings`
      );

      const totalPassengers = await executeQuery(
        `SELECT COUNT(*) as PassengerCount FROM Passengers`
      );

      return {
        bookingsByStatus: (bookingsByStatus || []).map(b => ({
          status: b.STATUS,
          count: b.COUNT
        })),
        averageBookingValue: avgBooking[0]?.AVGPRICE || 0,
        totalBookings: totalBookings[0]?.BOOKINGCOUNT || 0,
        uniqueBookers: totalBookings[0]?.UNIQUEUSERS || 0,
        totalPassengers: totalPassengers[0]?.PASSENGERCOUNT || 0
      };
    } catch (error) {
      console.error('Get booking stats error:', error.message);
      throw {
        status: 500,
        message: 'Failed to retrieve booking statistics',
        code: ERROR_CODES.DATABASE_ERROR
      };
    }
  },

  /**
   * Get user statistics
   * @returns {Promise<object>}
   */
  getUserStats: async () => {
    try {
      // Users by role
      const usersByRole = await executeQuery(
        `SELECT Role, COUNT(*) as Count FROM Users GROUP BY Role`
      );

      // Users with passenger profiles
      const usersWithProfiles = await executeQuery(
        `SELECT COUNT(DISTINCT UserID) as Count FROM Passengers`
      );

      // Active users (have bookings)
      const activeUsers = await executeQuery(
        `SELECT COUNT(DISTINCT UserID) as Count FROM Bookings`
      );

      // New users (created in last 30 days)
      const newUsers = await executeQuery(
        `SELECT COUNT(*) as Count FROM Users
         WHERE CreatedAt >= TRUNC(SYSDATE) - 30`
      );

      return {
        usersByRole: (usersByRole || []).map(u => ({
          role: u.ROLE,
          count: u.COUNT
        })),
        usersWithPassengerProfiles: usersWithProfiles[0]?.COUNT || 0,
        activeUsers: activeUsers[0]?.COUNT || 0,
        newUsersLastMonth: newUsers[0]?.COUNT || 0
      };
    } catch (error) {
      console.error('Get user stats error:', error.message);
      throw {
        status: 500,
        message: 'Failed to retrieve user statistics',
        code: ERROR_CODES.DATABASE_ERROR
      };
    }
  },

  /**
   * Get comprehensive dashboard stats
   * @returns {Promise<object>}
   */
  getDashboardStats: async () => {
    try {
      const [revenue, flights, bookings, users] = await Promise.all([
        adminService.getRevenueStats(),
        adminService.getFlightStats(),
        adminService.getBookingStats(),
        adminService.getUserStats()
      ]);

      return {
        timestamp: new Date().toISOString(),
        revenue,
        flights,
        bookings,
        users
      };
    } catch (error) {
      console.error('Get dashboard stats error:', error.message);
      throw {
        status: 500,
        message: 'Failed to retrieve dashboard statistics',
        code: ERROR_CODES.DATABASE_ERROR
      };
    }
  },

  /**
   * Get all Staff IDs with their assignment status
   * @returns {Promise<array>}
   */
  getStaffRegistry: async () => {
    try {
      const staffList = await executeQuery(
        `SELECT sr.StaffID, sr.IsAssigned,
                u.UserID, u.FirstName, u.LastName, u.Email
         FROM StaffRegistry sr
         LEFT JOIN Users u ON sr.AssignedUserID = u.UserID
         ORDER BY sr.StaffID ASC`
      );

      return (staffList || []).map(s => ({
        staffId: s.STAFFID,
        isAssigned: s.ISASSIGNED === 1,
        assignedUser: s.USERID ? {
          userId: s.USERID,
          firstName: s.FIRSTNAME,
          lastName: s.LASTNAME,
          email: s.EMAIL
        } : null
      }));
    } catch (error) {
      console.error('Get staff registry error:', error.message);
      throw {
        status: 500,
        message: 'Failed to retrieve staff registry',
        code: ERROR_CODES.DATABASE_ERROR
      };
    }
  },

  /**
   * Create a new unassigned Staff ID
   * @param {string} staffId
   * @returns {Promise<object>}
   */
  createStaffId: async (staffId) => {
    try {
      if (!staffId || typeof staffId !== 'string') {
        throw {
          status: 400,
          message: 'Valid Staff ID is required',
          code: ERROR_CODES.INVALID_INPUT
        };
      }

      const cleanId = staffId.trim().toUpperCase();
      if (!cleanId.startsWith('EA-STF') || cleanId.length > 20) {
        throw {
          status: 400,
          message: 'Staff ID must start with EA-STF and be under 20 characters (e.g., EA-STF021)',
          code: ERROR_CODES.INVALID_INPUT
        };
      }

      // Check if already exists
      const existing = await executeQuery(
        `SELECT StaffID FROM StaffRegistry WHERE StaffID = :cleanId`,
        { cleanId }
      );

      if (existing && existing.length > 0) {
        throw {
          status: 409,
          message: `Staff ID ${cleanId} already exists`,
          code: ERROR_CODES.DUPLICATE_ENTRY
        };
      }

      await executeQuery(
        `INSERT INTO StaffRegistry (StaffID, IsAssigned) VALUES (:cleanId, 0)`,
        { cleanId }
      );

      return {
        staffId: cleanId,
        isAssigned: false
      };
    } catch (error) {
      if (error.status) throw error;
      console.error('Create staff ID error:', error.message);
      throw {
        status: 500,
        message: 'Failed to create Staff ID',
        code: ERROR_CODES.DATABASE_ERROR
      };
    }
  },

  /**
   * Delete an unassigned Staff ID
   * @param {string} staffId
   * @returns {Promise<object>}
   */
  deleteStaffId: async (staffId) => {
    try {
      if (!staffId) {
        throw {
          status: 400,
          message: 'Staff ID is required',
          code: ERROR_CODES.INVALID_INPUT
        };
      }

      const cleanId = staffId.trim().toUpperCase();
      const existing = await executeQuery(
        `SELECT StaffID, IsAssigned FROM StaffRegistry WHERE StaffID = :cleanId`,
        { cleanId }
      );

      if (!existing || existing.length === 0) {
        throw {
          status: 404,
          message: `Staff ID ${cleanId} not found`,
          code: ERROR_CODES.NOT_FOUND
        };
      }

      if (existing[0].ISASSIGNED === 1) {
        throw {
          status: 400,
          message: `Cannot delete Staff ID ${cleanId} because it is already assigned to a registered user`,
          code: ERROR_CODES.INVALID_OPERATION
        };
      }

      await executeQuery(
        `DELETE FROM StaffRegistry WHERE StaffID = :cleanId AND IsAssigned = 0`,
        { cleanId }
      );

      return { success: true, message: `Staff ID ${cleanId} deleted successfully` };
    } catch (error) {
      if (error.status) throw error;
      console.error('Delete staff ID error:', error.message);
      throw {
        status: 500,
        message: 'Failed to delete Staff ID',
        code: ERROR_CODES.DATABASE_ERROR
      };
    }
  },

  /**
   * List all users with Staff or Admin role (for crew assignment)
   * @returns {Promise<array>}
   */
  getStaffUsers: async () => {
    try {
      const users = await executeQuery(
        `SELECT UserID, FirstName, LastName, Email, Role
         FROM Users
         WHERE Role IN ('Staff', 'Admin')
         ORDER BY LastName ASC, FirstName ASC`
      );

      return (users || []).map(u => ({
        userId: u.USERID,
        firstName: u.FIRSTNAME,
        lastName: u.LASTNAME,
        email: u.EMAIL,
        role: u.ROLE
      }));
    } catch (error) {
      console.error('Get staff users error:', error.message);
      throw {
        status: 500,
        message: 'Failed to retrieve staff users',
        code: ERROR_CODES.DATABASE_ERROR
      };
    }
  }
};

module.exports = adminService;