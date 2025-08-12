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

// If you have a DB connect (e.g., mongoose.connect(...)), put it RIGHT HERE.

const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

app.set('trust proxy', 1);
app.use(express.json());

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

const dev = process.env.NODE_ENV !== 'production';
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
    resave: false,
    saveUninitialized: false,
    name: 'connect.sid',
    cookie: {
      httpOnly: true,
      sameSite: dev ? 'lax' : 'none',
      secure: !dev,
    },
  })
);

// Routes
app.use('/api/users', users);
app.use('/api/enrollments', enrollments);
app.use('/api/courses', courses);
app.use('/api/modules', modules);
app.use('/api/assignments', assignments);

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Error handler
app.use((err, req, res, _next) => {
  console.error('[ERROR]', err);
  res.status(500).json({ message: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Kambaz server listening on :${PORT}`);
  console.log(`CORS origin: ${FRONTEND_URL}`);
});
