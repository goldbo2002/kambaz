import express from "express";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./users/routes.js"; // adjust path as needed

dotenv.config();

const app = express();

app.use(
  cors({
    origin:["https://silly-melba-c04293.netlify.app",
            "http://localhost:5173",], // front and local
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: "some secret key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "none",
      secure: true,
    },
  })
);

// ✅ Health check
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// ✅ User API routes
app.use("/api/users", userRoutes);

// ✅ MongoDB connection
const CONNECTION_STRING = process.env.DB_URI || "your-fallback-mongodb-uri";
mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
