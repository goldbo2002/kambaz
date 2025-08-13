
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');

const usersRoutes = require('./routes/users');
const coursesRoutes = require('./routes/courses');

const app = express();

const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-secret';
const MONGO_URI = process.env.DATABASE_CONNECTION_STRING;

if (!MONGO_URI) {
  console.error('Missing DATABASE_CONNECTION_STRING in .env');
  process.exit(1);
}

// Trust proxy 
app.set('trust proxy', 1);

// CORS + body parser
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());

// (
app.use((req, _res, next) => {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`);
  next();
});

// Sessions 
app.use(
  session({
    name: 'kambaz.sid',
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
);

// DB connect
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ Mongo connected'))
  .catch((err) => {
    console.error('❌ Mongo connection error', err);
    process.exit(1);
  });

// Health
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Fast POST 
app.post('/api/ping', (req, res) => {
  res.json({ ok: true, body: req.body ?? null, ts: Date.now() });
});

// API routes
usersRoutes(app);
coursesRoutes(app);

// 404 + error handlers
app.use((req, res) => res.status(404).json({ message: 'Not found' }));
app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err);
  res.status(500).json({ message: err?.message || 'Server error' });
});

// Start
app.listen(PORT, () => {
  console.log(`🚀 Kambaz server listening on :${PORT}`);
  console.log(`CORS origin: ${FRONTEND_URL}`);
});
