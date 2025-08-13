require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');

const usersRoutes = require('./routes/users');
const coursesRoutes = require('./routes/courses');
const modulesRoutes = require('./routes/modules');
const assignmentsRoutes = require('./routes/assignments');

const app = express();

const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-secret';
const MONGO_URI = process.env.DATABASE_CONNECTION_STRING;

app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { sameSite: 'none', secure: true },
}));

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.post('/api/ping', (req, res) => res.json({ ok: true, body: req.body, ts: Date.now() }));

app.use('/api/users', usersRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/modules', modulesRoutes);
app.use('/api/assignments', assignmentsRoutes);

app.use((req, res) => res.status(404).json({ message: 'Not found' }));
app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err);
  res.status(500).json({ message: err?.message || 'Server error' });
});

mongoose.connect(MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Kambaz server listening on :${PORT}`);
    console.log(`CORS origin: ${FRONTEND_URL}`);
  });
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
