const express = require("express");
const User = require("../models/User");

module.exports = function UsersRoutes(app) {
  app.post("/api/users/signup", async (req, res, next) => {
    try {
      const { username, password } = req.body || {};
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      const user = await User.create({ username, password });
      req.session.user = {
        _id: user._id,
        username: user.username,
      };
      res.status(201).json({ message: "Signup successful", user: req.session.user });
    } catch (err) {
      if (err.code === 11000) {
        // Duplicate key error (MongoDB error code for unique index conflict)
        return res.status(400).json({ message: "Username already taken" });
      }
      next(err);
    }
  });

  app.post("/api/users/signin", async (req, res, next) => {
    try {
      const { username, password } = req.body || {};
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }

      const user = await User.findOne({ username, password }).lean();
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      req.session.user = {
        _id: user._id,
        username: user.username,
      };
      res.json({ message: "Signin successful", user: req.session.user });
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/users/signout", (req, res) => {
    req.session.destroy(() => {
      res.json({ message: "Signed out" });
    });
  });

  app.get("/api/users/me", (req, res) => {
    if (!req.session?.user) {
      return res.status(401).json({ message: "Not signed in" });
    }
    res.json({ user: req.session.user });
  });
};
