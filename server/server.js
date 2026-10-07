// ============================================
// EXPRESS SERVER - AIRLINE MANAGEMENT SYSTEM
// COMPLETE: PHASES 1-5 (ALL FEATURES)
// ============================================

const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const { initializeDatabase, closeDatabase } = require('./db');
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

const allowedOrigins = [
  REACT_URL,
  'https://tanmaygurav2326.github.io',
  'https://country-sitemap-yourself-extract.trycloudflare.com',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5000',
  'http://127.0.0.1:5000'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin, or matching allowed origins or cloudflare/github domains
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      origin.endsWith('.github.io') ||
      origin.endsWith('.trycloudflare.com')
    ) {
      return callback(null, true);
    }
    return callback(new Error(`CORS policy violation: Origin ${origin} not allowed`), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Serve static build from React client
app.use(express.static(path.join(__dirname, '../client/build')));

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

// Catch-all route to serve React app for SPA routes (non-API)
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(__dirname, '../client/build/index.html');
  if (require('fs').existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    next();
  }
});

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

    const shutdown = async (signal) => {
      console.log(`\n⚠️  ${signal} received. Shutting down gracefully...`);
      server.close(async () => {
        await closeDatabase();
        console.log('✓ Server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

  } catch (error) {
    console.error('\n❌ STARTUP ERROR:', error.message);
    console.error(error);
    process.exit(1);
  }
};

startServer();

module.exports = app;