const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const { logger, info, error } = require('./logger.cjs');
const environment = require('./environment.cjs');
const { PORT: initialPort } = environment;
let currentPort = initialPort;

const app = express();

// Try to start server with port fallback
const startServer = (retries = 3) => {
  const server = app.listen(currentPort, 'localhost', () => {
    info(`Server running on port ${currentPort} in ${environment.name} mode`);
    info(`API server ready at http://localhost:${currentPort}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE' && retries > 0) {
      currentPort++;
      info(`Port ${currentPort - 1} in use, trying port ${currentPort}`);
      startServer(retries - 1);
    } else {
      error(`Failed to start server: ${err.message}`);
      process.exit(1);
    }
  });
};

// Basic middleware
app.enable('trust proxy');  // Enable trust proxy before other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      imgSrc: ["'self'", "data:", "https://images.unsplash.com"],
      connectSrc: ["'self'", "https://*.supabase.co"]
    }
  }
}));

// HTTP logging with morgan
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  trustProxy: true,
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many requests, please try again later.'
    });
  },
});
app.use('/api', limiter);

// API Routes
// Example: app.use('/api/auth', require('../src/routes/auth.cjs'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// In development, proxy to Vite dev server
if (process.env.NODE_ENV === 'development') {
  app.get('*', (req, res) => {
    res.redirect(`http://localhost:5173${req.path}`);
  });
} else {
  // In production, serve static files from the built client code
  app.use(express.static(path.join(__dirname, '../dist')));
  
  // Catch-all route to serve the frontend
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  error(err.stack);
  res.status(500).json({ error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message });
});

// Start the server
startServer();

module.exports = app;