// server/routes/courses.js

import express from "express";
import mongoose from "mongoose";
import Course from "../models/Course.js";
import Module from "../models/Module.js";
import Assignment from "../models/Assignment.js";

const router = express.Router();

function requireAuth(req, res, next) {
  if (!req.session?.user) return res.status(401).json({ message: "Unauthorized" });
  next();
}
function validateObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// — COURSES CRUD —

// GET all courses
router.get("/", requireAuth, async (req, res, next) => {
  try {
    const courses = await Course.find().lean();
    res.json(courses);
  } catch (e) { next(e); }
});

// POST create course
router.post("/", requireAuth, async (req, res, next) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: "Title required" });
  try {
    const course = await Course.create({ title });
    res.status(201).json(course);
  } catch (e) { next(e); }
});

// GET specific course
router.get("/:cid", requireAuth, async (req, res, next) => {
  const { cid } = req.params;
  if (!validateObjectId(cid)) return res.status(400).json({ message: "Invalid course ID" });
  try {
    const course = await Course.findById(cid).lean();
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (e) { next(e); }
});

// PUT update course
router.put("/:cid", requireAuth, async (req, res, next) => {
  const { cid } = req.params;
  if (!validateObjectId(cid)) return res.status(400).json({ message: "Invalid course ID" });
  try {
    const updated = await Course.findByIdAndUpdate(cid, req.body, { new: true, runValidators: true }).lean();
    if (!updated) return res.status(404).json({ message: "Course not found" });
    res.json(updated);
  } catch (e) { next(e); }
});

// DELETE course
router.delete("/:cid", requireAuth, async (req, res, next) => {
  const { cid } = req.params;
  if (!validateObjectId(cid)) return res.status(400).json({ message: "Invalid course ID" });
  try {
    const deleted = await Course.findByIdAndDelete(cid).lean();
    if (!deleted) return res.status(404).json({ message: "Course not found" });
    res.json({ ok: true, id: deleted._id });
  } catch (e) { next(e); }
});

// — MODULES —

// GET modules
router.get("/:cid/modules", requireAuth, async (req, res, next) => {
  const { cid } = req.params;
  if (!validateObjectId(cid)) return res.status(400).json({ message: "Invalid course ID" });
  try {
    const mods = await Module.find({ courseId: cid }).lean();
    res.json(mods);
  } catch (e) { next(e); }
});

// POST create module
router.post("/:cid/modules", requireAuth, async (req, res, next) => {
  const { cid } = req.params;
  const { title } = req.body;
  if (!validateObjectId(cid)) return res.status(400).json({ message: "Invalid course ID" });
  if (!title) return res.status(400).json({ message: "Title required" });
  try {
    const mod = await Module.create({ courseId: cid, title });
    res.status(201).json(mod);
  } catch (e) { next(e); }
});

// — ASSIGNMENTS —

// GET assignments
router.get("/:cid/assignments", requireAuth, async (req, res, next) => {
  const { cid } = req.params;
  if (!validateObjectId(cid)) return res.status(400).json({ message: "Invalid course ID" });
  try {
    const assignments = await Assignment.find({ courseId: cid }).lean();
    res.json(assignments);
  } catch (e) { next(e); }
});

// POST create assignment
router.post("/:cid/assignments", requireAuth, async (req, res, next) => {
  const { cid } = req.params;
  const { title, dueDate, description, points } = req.body;
  if (!validateObjectId(cid)) return res.status(400).json({ message: "Invalid course ID" });
  if (!title) return res.status(400).json({ message: "Title required" });
  try {
    const assignment = await Assignment.create({ courseId: cid, title, dueDate, description, points });
    res.status(201).json(assignment);
  } catch (e) { next(e); }
});

// GET single assignment
router.get("/:cid/assignments/:aid", requireAuth, async (req, res, next) => {
  const { cid, aid } = req.params;
  if (!validateObjectId(cid) || !validateObjectId(aid)) return res.status(400).json({ message: "Invalid ID(s)" });
  try {
    const a = await Assignment.findOne({ _id: aid, courseId: cid }).lean();
    if (!a) return res.status(404).json({ message: "Assignment not found" });
    res.json(a);
  } catch (e) { next(e); }
});

// PUT update assignment
router.put("/:cid/assignments/:aid", requireAuth, async (req, res, next) => {
  const { cid, aid } = req.params;
  if (!validateObjectId(cid) || !validateObjectId(aid)) return res.status(400).json({ message: "Invalid ID(s)" });
  try {
    const updated = await Assignment.findOneAndUpdate({ _id: aid, courseId: cid }, req.body, { new: true, runValidators: true }).lean();
    if (!updated) return res.status(404).json({ message: "Assignment not found" });
    res.json(updated);
  } catch (e) { next(e); }
});

export default router;
