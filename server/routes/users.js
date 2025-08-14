import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import User from "../models/User.js"; // or adjust the path

// probe to confirm the router is mounted
router.get("/ping", (_req, res) => res.json({ ok: true, who: "users-router" }));


router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ username });
    if (existing) return res.status(409).json({ message: "Username taken" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ username, password: hashedPassword });

    // Save session
    req.session.user = {
      _id: user._id,
      username: user.username,
    };

    res.json(req.session.user);
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Signup failed" });
  }
});
router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid username or password" });

    // Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid username or password" });

    // Save session
    req.session.user = {
      _id: user._id,
      username: user.username,
    };

    res.json(req.session.user);
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ message: "Signin failed" });
  }
});

router.get("/me", (req, res) => {
  if (!req.session.user) return res.status(401).json({ message: "Not signed in" });
  res.json(req.session.user);
});

router.get("/profile", (req, res) => {
  if (!req.session.user) return res.status(401).json({ message: "Not signed in" });
  res.json(req.session.user);
});
router.post("/signout", (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

export default router;

