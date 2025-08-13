const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  try {
    const created = await User.create(req.body);
    req.session.user = created;
    res.status(201).json(created);
  } catch (e) { next(e); }
});

router.post("/signin", async (req, res, next) => {
  try {
    const found = await User.findOne({
      email: req.body.email,
      password: req.body.password
    }).lean();
    if (!found) return res.status(404).json({ message: "invalid credentials" });
    req.session.user = found;
    res.json(found);
  } catch (e) { next(e); }
});

router.post("/signout", (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

module.exports = router;
