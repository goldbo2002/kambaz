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
  origin: [ "http://localhost:5173", 
    "https://silly-melba-c04293.netlify.app", ],
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || "keyboard cat",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,           
    sameSite: "none",       //cross-site cookies
     httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, 
  },
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
