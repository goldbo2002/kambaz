const express = require("express");
const User = require("../models/User");
const router = express.Router();

// probe to confirm the router is mounted
router.get("/ping", (_req, res) => res.json({ ok: true, who: "users-router" }));

router.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password, firstName, lastName, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
      role: role || "STUDENT",
    });

    // ✅ Save user to session
    req.session.user = {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
    };

    res.status(201).json(req.session.user);
  } catch (err) {
    next(err);
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

module.exports = router; // ← REQUIRED
