import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGO_URI) {
  console.error("❌ Missing MONGO_URI environment variable");
  process.exit(1);
}

const path = require('path');
const fs = require('fs');

function maskUri(uri = '') {
  return uri.replace(/\/\/([^:]+):[^@]*@/, '//$1:*****@');
}

// 1) Load env from process first (Render injects these), then fallback to .env files
// Try server/.env, then ../.env
(() => {
  // If DATABASE_CONNECTION_STRING is already present (e.g., Render), leave it
  if (process.env.DATABASE_CONNECTION_STRING) return;
  try {
    const dotenv = require('dotenv');

    // Prefer server/.env if present
    const serverDotenv = path.join(__dirname, '.env');
    if (fs.existsSync(serverDotenv)) {
      dotenv.config({ path: serverDotenv });
      return;
    }

    // Fallback to repo root ../.env
    const rootDotenv = path.join(__dirname, '..', '.env');
    if (fs.existsSync(rootDotenv)) {
      dotenv.config({ path: rootDotenv });
      return;
    }

    // Last resort: default dotenv (will look in CWD)
    dotenv.config();
  } catch (_) {
    // no-op if dotenv not installed; Render doesn't need it
  }
})();

// 2) Imports
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');

const usersRoutes = require('./routes/users');
const coursesRoutes = require('./routes/courses');

// 3) Config
const app = express();

const PORT = process.env.PORT || 4000;
// Prefer CLIENT_URL (your .env), else FRONTEND_URL, else localhost
const FRONTEND_URL =
  process.env.CLIENT_URL ||
  process.env.FRONTEND_URL ||
  'http://localhost:5173';

const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-secret';
const MONGO_URI = process.env.DATABASE_CONNECTION_STRING;

// Friendly boot logs to confirm envs
console.log('CORS origin:', FRONTEND_URL);
console.log(
  'DB URI (masked):',
  MONGO_URI ? maskUri(MONGO_URI) : '(missing)'
);

if (!MONGO_URI) {
  console.error(
    '❌ Missing DATABASE_CONNECTION_STRING. ' +
      'Set it in Render (Environment → Environment Variables) OR provide server/.env or .env at repo root.'
  );
  process.exit(1);
}

// 4) Trust proxy for secure cookies on Render/Heroku
app.set('trust proxy', 1);

// 5) Middleware
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());

// (Optional) request logger — super helpful on Render
app.use((req, _res, next) => {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`);
  next();
});

// Sessions (MemoryStore is fine for class projects; switch to connect-mongo for prod durability)
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

// 6) DB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ Mongo connected'))
  .catch((err) => {
    console.error('❌ Mongo connection error', err);
    process.exit(1);
  });

// 7) Health + debug ping
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Quick POST echo to prove POST works end-to-end on prod
app.post('/api/ping', (req, res) => {
  res.json({ ok: true, body: req.body ?? null, ts: Date.now() });
});

// 8) API routes
usersRoutes(app);
coursesRoutes(app);

// 9) 404 + error handlers
app.use((req, res) => res.status(404).json({ message: 'Not found' }));
app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err);
  res.status(500).json({ message: err?.message || 'Server error' });
});

// 10) Start
app.listen(PORT, () => {
  console.log(`🚀 Kambaz server listening on :${PORT}`);
});
