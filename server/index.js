import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import coursesRouter from "./routes/courses.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: [ "http://localhost:5173", process.env.FRONTEND_URL ],
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || "secret123",
  resave: false,
  saveUninitialized: false,
  cookie: { sameSite: "none", secure: process.env.NODE_ENV === "production" }
}));

app.get("/api/health", (_, res) => res.sendStatus(200));

app.use("/api/users", userRoutes);
app.use("/api/courses", coursesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/kambaz")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err));
