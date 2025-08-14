const express = require("express");
const Module = require("../models/Module");

const router = express.Router();

// Authentication middleware
function requireAuth(req, res, next) {
  if (!req.session?.user) return res.status(401).json({ message: "Unauthorized" });
  next();
}

// GET all modules for a course
router.get("/courses/:cid/modules", async (req, res, next) => {
  try {
    const modules = await Module.find({ courseId: req.params.cid }).lean();
    res.json(modules);
  } catch (e) {
    next(e);
  }
});

// GET a single module
router.get("/courses/:cid/modules/:mid", async (req, res, next) => {
  try {
    const mod = await Module.findOne({
      _id: req.params.mid,
      courseId: req.params.cid,
    }).lean();

    if (!mod) return res.status(404).json({ message: "Module not found" });
    res.json(mod);
  } catch (e) {
    next(e);
  }
});

// POST create a new module
router.post("/courses/:cid/modules", requireAuth, async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Title required" });

    const mod = await Module.create({
      courseId: req.params.cid,
      title,
    });

    res.status(201).json(mod);
  } catch (e) {
    next(e);
  }
});

// PUT update a module
router.put("/courses/:cid/modules/:mid", requireAuth, async (req, res, next) => {
  try {
    const updated = await Module.findOneAndUpdate(
      { _id: req.params.mid, courseId: req.params.cid },
      req.body,
      { new: true, runValidators: true }
    ).lean();

    if (!updated) return res.status(404).json({ message: "Module not found" });
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
