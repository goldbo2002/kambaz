import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();

function requireAuth(req, res, next) {
  if (!req.session?.user) return res.status(401).json({ message: "Unauthorized" });
  next();
}

// Debug session dump
router.get("/debug/session", (req, res) => {
  res.json({ session: req.session });
});

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: "Email in use" });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hash });

  req.session.user = {
    _id: user._id,
    email: user.email,
    username: user.username,
  };

  res.status(201).json({user});
});

router.post("/signin", async (req, res) => {
  console.log("SIGNIN BODY:", req.body);
  console.log("SESSION BEFORE:", req.session);

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid email" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Incorrect password" });

  req.session.user = {
    _id: user._id,
    email: user.email,
    username: user.username,
  };

  console.log("SESSION AFTER:", req.session);
  res.json({ message: "Signed in", user });
});

router.get("/profile", requireAuth, async (req, res) => {
  console.log("PROFILE SESSION:", req.session);

  const user = await User.findById(req.session.user._id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
});
import express from "express";

// 
router.get("/me", (req, res) => {
  if (req.session?.user) {
    return res.json(req.session.user);
  }
  res.status(404).json({ message: "Not authenticated" });
});

export default router;