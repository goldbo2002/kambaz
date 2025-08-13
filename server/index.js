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

app.set('trust proxy', 1); // cookies

// cors
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));
app.options('*', cors({ origin: FRONTEND_URL, credentials: true })); // 

app.use(express.json()); //  


app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: 'none', 
    secure: true,     
    httpOnly: true
  },
}));


