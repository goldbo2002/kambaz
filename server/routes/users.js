// server/routes/users.js
const express = require("express");
const User = require("../models/User");

const router = express.Router();

/**
 * SIGNUP
 * Creates a new user and stores minimal info in the session.
 * Body: { username, email, password, firstName?, lastName?, role? }
 */
router.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password, firstName, lastName, role } = req.body || {};

    if (!username || !email || !password) {
      return res.status(400).json({ message: "username, email, and password are required" });
    }

    const user = await User.create({
      username,
      email,
      password,            // (class project: plain text; real apps: hash it)
      firstName,
      lastName,
      role: role || "USER",
    });

    req.session.user = {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
    };

    return res.status(201).json(req.session.user);
  } catch (err) {
    return next(err);
  }
});

/**
 * SIGNIN
 * Allows login via username OR email + password.
 * Body: { username?, email?, password }
 */
router.post("/signin", async (req, res, next) => {
  try {
    const { username, email, password } = req.body || {};
    if ((!username && !email) || !password) {
      return res.status(400).json({ message: "username or email AND password are required" });
    }

    const query = username ? { username } : { email };
    const user = await User.findOne(query);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.user = {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
    };

    return res.json(req.session.user);
  } catch (err) {
    return next(err);
  }
});

/**
 * WHOAMI
 * Returns the current session user.
 */
router.get("/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not signed in" });
  }
  return res.json(req.session.user);
});

/**
 * UPDATE ME
 * Updates current user's profile fields and refreshes session.
 * Body: { email?, firstName?, lastName?, role?, password? }
 */
router.put("/me", async (req, res, next) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not signed in" });
    }

    const { email, firstName, lastName, role, password } = req.body || {};
    const updates = {};
    if (typeof email === "string") updates.email = email;
    if (typeof firstName === "string") updates.firstName = firstName;
    if (typeof lastName === "string") updates.lastName = lastName;
    if (typeof role === "string") updates.role = role;
    if (typeof password === "string") updates.password = password;

    const user = await User.findByIdAndUpdate(req.session.user._id, updates, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });

    req.session.user = {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
    };

    return res.json(req.session.user);
  } catch (err) {
    return next(err);
  }
});

/**
 * SIGNOUT
 * Destroys the session and clears the cookie.
 */
router.post("/signout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    // cookie flags must match what you set in express-session config
    res.clearCookie("connect.sid", { httpOnly: true, secure: true, sameSite: "none" });
    return res.json({ message: "Signed out" });
  });
});

module.exports = router;
