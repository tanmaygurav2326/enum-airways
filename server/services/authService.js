// ============================================
// AUTH SERVICE - User Authentication & Registration
// ============================================

// StaffRegistry table schema reference:
//   StaffID     VARCHAR2(20) PRIMARY KEY
//   IsActive    NUMBER(1) DEFAULT 1
//   UsedByEmail VARCHAR2(255)
// Admins are DB-seeded only — role can never be 'Admin' via registration.

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { executeQuery, getConnection } = require('../db');
const { ERROR_CODES, USER_ROLES } = require('../utils/constants');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

const authService = {
  /**
   * Register a new user.
   * Role is determined server-side only:
   *   - staffId provided & valid in StaffRegistry → 'Staff'
   *   - no staffId → 'Passenger'
   *   - 'Admin' can never be assigned through registration
   */
  registerUser: async (userData) => {
    let connection;
    try {
      const { email, password, firstName, lastName, staffId } = userData;

      if (!email || !password || !firstName || !lastName) {
        throw {
          status: 400,
          message: 'Email, password, first name, and last name are required',
          code: ERROR_CODES.INVALID_INPUT
        };
      }

      const existingUsers = await executeQuery(
        `SELECT UserID FROM Users WHERE Email = :email`,
        { email }
      );

      if (existingUsers && existingUsers.length > 0) {
        throw {
          status: 409,
          message: 'User with this email already exists',
          code: ERROR_CODES.DUPLICATE_ENTRY
        };
      }

      // ── Determine role from StaffRegistry (server-side only) ────────────
      let role;
      if (staffId) {
        connection = await getConnection();

        const staffRes = await connection.execute(
          `SELECT StaffID, IsAssigned FROM StaffRegistry WHERE StaffID = :staffId`,
          { staffId }
        );

        const staffRow = staffRes.rows && staffRes.rows[0];
        const isAssigned = staffRow
          ? (Array.isArray(staffRow) ? staffRow[1] : (staffRow.ISASSIGNED ?? staffRow.IsAssigned))
          : null;

        if (!staffRow || isAssigned !== 0) {
          throw {
            status: 400,
            message: 'Invalid or already claimed Staff ID',
            code: ERROR_CODES.INVALID_INPUT
          };
        }

        role = 'Staff';
      } else {
        role = 'Passenger';
        connection = await getConnection();
      }
      // ────────────────────────────────────────────────────────────────────

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      await connection.execute(
        `INSERT INTO Users (Email, PasswordHash, FirstName, LastName, Role)
         VALUES (:email, :passwordHash, :firstName, :lastName, :role)`,
        { email, passwordHash, firstName, lastName, role }
      );

      // Fetch user within active transaction prior to commit
      const result = await connection.execute(
        `SELECT UserID, Email, FirstName, LastName, Role, CreatedAt
         FROM Users
         WHERE Email = :email`,
        { email }
      );

      if (staffId && result.rows && result.rows.length > 0) {
        const uRow = result.rows[0];
        const uId = Array.isArray(uRow) ? uRow[0] : (uRow.USERID || uRow.UserId);
        await connection.execute(
          `UPDATE StaffRegistry SET IsAssigned = 1, AssignedUserID = :uId WHERE StaffID = :staffId`,
          { uId, staffId }
        );
      }

      await connection.commit();

      if (!result.rows || result.rows.length === 0) {
        throw {
          status: 500,
          message: 'Failed to retrieve registered user',
          code: ERROR_CODES.DATABASE_ERROR
        };
      }

      const row = result.rows[0];
      const newUser = Array.isArray(row) ? {
        USERID: row[0],
        EMAIL: row[1],
        FIRSTNAME: row[2],
        LASTNAME: row[3],
        ROLE: row[4]
      } : row;

      const userId = newUser.USERID || newUser.UserId;
      const userEmail = newUser.EMAIL || newUser.Email;
      const userRole = newUser.ROLE || newUser.Role;

      const token = jwt.sign(
        { userId, email: userEmail, role: userRole },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      return {
        user: {
          userId,
          email: userEmail,
          firstName: newUser.FIRSTNAME || newUser.FirstName,
          lastName: newUser.LASTNAME || newUser.LastName,
          role: userRole
        },
        token
      };
    } catch (error) {
      if (connection) {
        await connection.rollback();
      }
      if (error.status) throw error;
      console.error('Registration error:', error.message);
      throw {
        status: 500,
        message: 'Failed to register user',
        code: ERROR_CODES.DATABASE_ERROR
      };
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  },

  /**
   * Log in an existing user
   */
  loginUser: async (email, password) => {
    try {
      if (!email || !password) {
        throw {
          status: 400,
          message: 'Email and password are required',
          code: ERROR_CODES.INVALID_INPUT
        };
      }

      const users = await executeQuery(
        `SELECT UserID, Email, PasswordHash, FirstName, LastName, Role
         FROM Users
         WHERE Email = :email`,
        { email }
      );

      if (!users || users.length === 0) {
        throw {
          status: 401,
          message: 'Invalid email or password',
          code: ERROR_CODES.UNAUTHORIZED
        };
      }

      const user = users[0];
      const isPasswordValid = await bcrypt.compare(password, user.PASSWORDHASH);

      if (!isPasswordValid) {
        throw {
          status: 401,
          message: 'Invalid email or password',
          code: ERROR_CODES.UNAUTHORIZED
        };
      }

      const token = jwt.sign(
        { userId: user.USERID, email: user.EMAIL, role: user.ROLE },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      return {
        user: {
          userId: user.USERID,
          email: user.EMAIL,
          firstName: user.FIRSTNAME,
          lastName: user.LASTNAME,
          role: user.ROLE
        },
        token
      };
    } catch (error) {
      if (error.status) throw error;
      console.error('Login error:', error.message);
      throw {
        status: 500,
        message: 'Failed to log in',
        code: ERROR_CODES.DATABASE_ERROR
      };
    }
  },

  /**
   * Verify JWT token
   * @param {string} token
   * @returns {object} - Decoded token payload
   */
  verifyToken: (token) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('TOKEN_EXPIRED');
      }
      throw new Error('INVALID_TOKEN');
    }
  },

  /**
   * Get user profile by UserID
   * @param {number} userId
   * @returns {Promise<object>} - User profile
   */
  getUserProfile: async (userId) => {
    try {
      const users = await executeQuery(
        `SELECT UserID, Email, FirstName, LastName, Role, CreatedAt
         FROM Users
         WHERE UserID = :userId`,
        { userId }
      );

      if (!users || users.length === 0) {
        throw {
          status: 404,
          message: 'User not found',
          code: ERROR_CODES.NOT_FOUND
        };
      }

      const user = users[0];
      return {
        userId: user.USERID || user.UserId,
        email: user.EMAIL || user.Email,
        firstName: user.FIRSTNAME || user.FirstName,
        lastName: user.LASTNAME || user.LastName,
        role: user.ROLE || user.Role,
        createdAt: user.CREATEDAT || user.CreatedAt
      };
    } catch (error) {
      if (error.status) throw error;
      console.error('Get profile error:', error.message);
      throw {
        status: 500,
        message: 'Failed to retrieve user profile',
        code: ERROR_CODES.DATABASE_ERROR
      };
    }
  },

  /**
   * Delete / deactivate user account
   * @param {number} userId - The ID of the user requesting deletion
   * @param {string} password - Current password for verification
   */
  deleteAccount: async (userId, password) => {
    let connection;
    try {
      if (!userId || !password) {
        throw {
          status: 400,
          message: 'Password is required to confirm account deletion',
          code: ERROR_CODES.INVALID_INPUT
        };
      }

      // 1. Fetch user record including password hash and role
      const users = await executeQuery(
        `SELECT UserID, PasswordHash, Role FROM Users WHERE UserID = :userId`,
        { userId }
      );

      if (!users || users.length === 0) {
        throw {
          status: 404,
          message: 'User account not found',
          code: ERROR_CODES.NOT_FOUND
        };
      }

      const user = users[0];
      const role = user.ROLE || user.Role;
      const dbPasswordHash = user.PASSWORDHASH || user.PasswordHash;

      // 2. Reject deletion if role is Admin
      if (role === 'Admin') {
        throw {
          status: 403,
          message: 'Admin accounts cannot be deleted through this user-facing setting.',
          code: ERROR_CODES.FORBIDDEN
        };
      }

      // 3. Verify current password
      const isPasswordValid = await bcrypt.compare(password, dbPasswordHash);
      if (!isPasswordValid) {
        throw {
          status: 401,
          message: 'Incorrect password. Account deletion aborted.',
          code: ERROR_CODES.UNAUTHORIZED
        };
      }

      // 4. Safely disassociate user references to preserve historical financial / flight records
      connection = await getConnection();

      // Delete active user sessions
      await connection.execute(
        `DELETE FROM UserSessions WHERE UserID = :userId`,
        { userId }
      );

      // Disassociate user from historical bookings (preserves booking, tickets, and payment history)
      await connection.execute(
        `UPDATE Bookings SET UserID = NULL WHERE UserID = :userId`,
        { userId }
      );

      // Disassociate passenger profile
      await connection.execute(
        `UPDATE Passengers SET UserID = NULL WHERE UserID = :userId`,
        { userId }
      );

      // Delete crew assignment if staff
      await connection.execute(
        `DELETE FROM CrewAssignment WHERE UserID = :userId`,
        { userId }
      );

      // Unassign StaffRegistry ID if assigned
      await connection.execute(
        `UPDATE StaffRegistry SET AssignedUserID = NULL, IsAssigned = 0 WHERE AssignedUserID = :userId`,
        { userId }
      );

      // Delete the user record
      await connection.execute(
        `DELETE FROM Users WHERE UserID = :userId`,
        { userId }
      );

      await connection.commit();

      return {
        message: 'Account successfully deleted'
      };
    } catch (error) {
      if (connection) {
        try {
          await connection.rollback();
        } catch (rErr) {
          // ignore rollback error
        }
      }
      if (error.status) throw error;
      console.error('Delete account error:', error.message);
      throw {
        status: 500,
        message: 'Failed to delete account',
        code: ERROR_CODES.DATABASE_ERROR
      };
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (cErr) {
          // ignore close error
        }
      }
    }
  },

  /**
   * Change user password
   * @param {number} userId - The authenticated user's ID
   * @param {string} currentPassword - Existing password to verify
   * @param {string} newPassword - New password to set
   */
  changePassword: async (userId, currentPassword, newPassword) => {
    let connection;
    try {
      if (!userId || !currentPassword || !newPassword) {
        throw {
          status: 400,
          message: 'User ID, current password, and new password are required',
          code: ERROR_CODES.INVALID_INPUT
        };
      }

      if (newPassword.length < 6) {
        throw {
          status: 400,
          message: 'New password must be at least 6 characters long',
          code: ERROR_CODES.INVALID_INPUT
        };
      }

      // 1. Fetch user to check current password
      const users = await executeQuery(
        `SELECT UserID, PasswordHash FROM Users WHERE UserID = :userId`,
        { userId }
      );

      if (!users || users.length === 0) {
        throw {
          status: 404,
          message: 'User not found',
          code: ERROR_CODES.NOT_FOUND
        };
      }

      const user = users[0];
      const dbHash = user.PASSWORDHASH || user.PasswordHash;

      // 2. Verify current password
      const isMatch = await bcrypt.compare(currentPassword, dbHash);
      if (!isMatch) {
        throw {
          status: 401,
          message: 'Incorrect current password. Please try again.',
          code: ERROR_CODES.UNAUTHORIZED
        };
      }

      // 3. Hash new password
      const saltRounds = 10;
      const newHash = await bcrypt.hash(newPassword, saltRounds);

      // 4. Update password in database
      connection = await getConnection();
      await connection.execute(
        `UPDATE Users SET PasswordHash = :newHash WHERE UserID = :userId`,
        { newHash, userId }
      );
      await connection.commit();

      return {
        message: 'Password changed successfully'
      };
    } catch (error) {
      if (connection) {
        try {
          await connection.rollback();
        } catch (rErr) {
          // ignore rollback error
        }
      }
      if (error.status) throw error;
      console.error('Change password error:', error.message);
      throw {
        status: 500,
        message: 'Failed to change password',
        code: ERROR_CODES.DATABASE_ERROR
      };
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (cErr) {
          // ignore close error
        }
      }
    }
  }
};

module.exports = authService;