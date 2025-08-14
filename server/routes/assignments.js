const express = require("express");
const Assignment = require("../models/Assignment");

const router = express.Router();

// Middleware to require auth
function requireAuth(req, res, next) {
  if (!req.session?.user) return res.status(401).json({ message: "Unauthorized" });
  next();
}

// GET /courses/:cid/assignments
router.get("/", async (req, res, next) => {
  try {
    const assignments = await Assignment.find({ courseId: req.params.cid }).lean();
    res.json(assignments);
  } catch (e) {
    next(e);
  }
});

// GET /courses/:cid/assignments/:aid
router.get("/:aid", async (req, res, next) => {
  try {
    const assignment = await Assignment.findOne({
      _id: req.params.aid,
      courseId: req.params.cid,
    }).lean();

    if (!assignment) return res.status(404).json({ message: "Assignment not found" });
    res.json(assignment);
  } catch (e) {
    next(e);
  }
});

// POST /courses/:cid/assignments
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { title, dueDate, description } = req.body;
    if (!title) return res.status(400).json({ message: "Title required" });

    const assignment = await Assignment.create({
      courseId: req.params.cid,
      title,
      dueDate,
      description,
    });

    res.status(201).json(assignment);
  } catch (e) {
    next(e);
  }
});

// PUT /courses/:cid/assignments/:aid
router.put("/:aid", requireAuth, async (req, res, next) => {
  try {
    const updated = await Assignment.findOneAndUpdate(
      { _id: req.params.aid, courseId: req.params.cid },
      req.body,
      { new: true, runValidators: true }
    ).lean();

    if (!updated) return res.status(404).json({ message: "Assignment not found" });
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

// DELETE /courses/:cid/assignments/:aid
router.delete("/:aid", requireAuth, async (req, res, next) => {
  try {
    const deleted = await Assignment.findOneAndDelete({
      _id: req.params.aid,
      courseId: req.params.cid,
    }).lean();

    if (!deleted) return res.status(404).json({ message: "Assignment not found" });
    res.json({ ok: true, id: deleted._id });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
