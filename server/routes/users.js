import express from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import User from "../models/User.js";

const router = express.Router();

function requireAuth(req, res, next) {
  if (!req.session?.user) return res.status(401).json({ message: "Unauthorized" });
  next();
}

// POST /api/users/signup
router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, username, firstName, lastName } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ message: "Required fields missing" });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash, username, firstName, lastName });
    res.status(201).json({ message: "User created", user });
  } catch (e) {
    next(e);
  }
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


// POST /api/users/signout
router.post("/signout", requireAuth, (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: "Signout failed" });
    res.clearCookie("connect.sid");
    res.json({ message: "Signed out" });
  });
});

export default router;
