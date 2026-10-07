// ============================================
// EXPRESS SERVER - AIRLINE MANAGEMENT SYSTEM
// COMPLETE: PHASES 1-5 (ALL FEATURES)
// ============================================

const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const { initializeDatabase } = require('./db');
const errorHandler = require('./middleware/errorHandler');

// Routes - ALL PHASES
const authRoutes = require('./routes/auth.routes');
const flightRoutes = require('./routes/flights.routes');
const airportRoutes = require('./routes/airports.routes');
const bookingRoutes = require('./routes/bookings.routes');
const paymentRoutes = require('./routes/payments.routes');
const passengerRoutes = require('./routes/passengers.routes');
const baggageRoutes = require('./routes/baggage.routes');
const crewRoutes = require('./routes/crew.routes');
const adminRoutes = require('./routes/admin.routes');
const feedbackRoutes = require('./routes/feedback.routes');
const currencyRoutes = require('./routes/currency.routes');

const app = express();
const PORT = process.env.PORT || 5000;
const REACT_URL = process.env.REACT_APP_URL || 'http://localhost:3000';

// ============================================
// MIDDLEWARE
// ============================================

app.use(cors({
  origin: REACT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ============================================
// HEALTH CHECK ENDPOINT
// ============================================

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ============================================
// API ROUTES - COMPLETE
// ============================================

app.use('/api/auth', authRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/airports', airportRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/passengers', passengerRoutes);
app.use('/api/baggage', baggageRoutes);
app.use('/api/crews', crewRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/currency', currencyRoutes);

// ============================================
// 404 - ROUTE NOT FOUND
// ============================================

app.use((req, res) => {
  console.warn(`[404] Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: 'Route not found',
    error: 'NOT_FOUND',
    path: req.originalUrl,
    method: req.method
  });
});

// ============================================
// GLOBAL ERROR HANDLER (Must be last)
// ============================================

app.use(errorHandler);

// ============================================
// DATABASE INITIALIZATION & SERVER START
// ============================================

const startServer = async () => {
  try {
    await initializeDatabase();

    const server = app.listen(PORT, () => {
      console.log(`✓ Oracle 21c Database Connected`);
      console.log(`🚀 Enum Airways Backend Server is ready on http://localhost:${PORT}/api`);
    });

    process.on('SIGTERM', () => {
      console.log('\n⚠️  SIGTERM received. Shutting down gracefully...');
      server.close(() => {
        console.log('✓ Server closed');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('\n❌ STARTUP ERROR:', error.message);
    console.error(error);
    process.exit(1);
  }
};

startServer();

module.exports = app;