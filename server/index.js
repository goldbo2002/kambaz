import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import cors from 'cors';

import enrollments from './routes/enrollments.js';
import users from './routes/users.js';
 import courses from './routes/courses.js';
import modules from './routes/modules.js';
 import assignments from './routes/assignments.js';

const app = express();

/**
 * CONFIG
 */
const PORT = process.env.PORT || 4000;
// IMPORTANT: set this on Render to your Netlify site URL (no trailing slash)
const FRONTEND_URL =
  process.env.FRONTEND_URL || 'https://silly-melba-c04293.netlify.app';

// Let Express know it's behind a proxy (Render/Cloudflare) so 'secure' cookies work
app.set('trust proxy', 1);

// JSON body parsing
app.use(express.json());

// CORS: allow Netlify front-end + send cookies cross-origin
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true
  })
);

// cookie must be SameSite=None; Secure for cross-origin
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
    resave: false,
    saveUninitialized: false,
    name: 'connect.sid',
    cookie: {
      httpOnly: true,
      sameSite: 'none',
      secure: true // Render/HTTPS
    }
  })
);

/**
 * ROUTES
 */
app.get('/api/health', (req, res) => res.json({ ok: true }));

// mount existing routes (ensure file paths match your repo)
app.use('/api/users', users);
app.use('/api/enrollments', enrollments);


// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('[ERROR]', err);
  res.status(500).json({ message: 'Server error' });
});

/**
 * START
 */
app.listen(PORT, () => {
  console.log(`Kambaz server listening on :${PORT}`);
  console.log(`CORS origin: ${FRONTEND_URL}`);
});
