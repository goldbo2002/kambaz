import express from "express";
import Course from "../models/Course.js";
import Assignment from "../models/Assignment.js";
import Module from "../models/Module.js";

const router = express.Router();

function requireAuth(req, res, next) {
  if (!req.session?.user) return res.status(401).json({ message: "Unauthorized" });
  next();
}

// Get all courses
router.get("/", requireAuth, async (req, res, next) => {
  try {
    const courses = await Course.find({}).lean();
    res.json(courses);
  } catch (e) {
    next(e);
  }
});

// Get course by ID
router.get("/:cid", async (req, res, next) => {
  try {
    const doc = await Course.findById(req.params.cid).lean();
    if (!doc) return res.status(404).json({ message: "not found" });
    res.json(doc);
  } catch (e) {
    next(e);
  }
});

// Update course
router.put("/:cid", requireAuth, async (req, res, next) => {
  try {
    const updated = await Course.findByIdAndUpdate(req.params.cid, req.body, {
      new: true,
      runValidators: true
    }).lean();
    if (!updated) return res.status(404).json({ message: "not found" });
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

// Delete course
router.delete("/:cid", requireAuth, async (req, res, next) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.cid).lean();
    if (!deleted) return res.status(404).json({ message: "not found" });
    res.json({ ok: true, id: deleted._id });
  } catch (e) {
    next(e);
  }
});

// Get all modules for a course
router.get("/:cid/modules", async (req, res, next) => {
  try {
    const modules = await Module.find({ courseId: req.params.cid }).lean();
    res.json(modules);
  } catch (e) {
    next(e);
  }
});

// Get all assignments for a course
router.get("/:cid/assignments", async (req, res, next) => {
  try {
    const assignments = await Assignment.find({ courseId: req.params.cid }).lean();
    res.json(assignments);
  } catch (e) {
    next(e);
  }
});

// Create new assignment
router.post("/:cid/assignments", requireAuth, async (req, res, next) => {
  try {
    const { title, dueDate, description } = req.body;
    if (!title) return res.status(400).json({ message: "title required" });

    const assignment = await Assignment.create({
      courseId: req.params.cid,
      title,
      dueDate,
      description
    });

    res.status(201).json(assignment);
  } catch (e) {
    next(e);
  }
});

// Get single assignment
router.get("/:cid/assignments/:aid", async (req, res, next) => {
  try {
    const assignment = await Assignment.findOne({
      _id: req.params.aid,
      courseId: req.params.cid
    }).lean();

    if (!assignment) return res.status(404).json({ message: "Assignment not found" });
    res.json(assignment);
  } catch (e) {
    next(e);
  }
});

// Update assignment
router.put("/:cid/assignments/:aid", requireAuth, async (req, res, next) => {
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

export default router;
