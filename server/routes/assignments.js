import express from "express";
import mongoose from "mongoose";
import Assignment from "../models/Assignment.js";

const router = express.Router();

function requireAuth(req, res, next) {
  if (!req.session?.user) return res.status(401).json({ message: "Unauthorized" });
  next();
}

function validateObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// GET /api/courses/:cid/assignments
router.get("/", requireAuth, async (req, res, next) => {
  const { cid } = req.params;
  if (!validateObjectId(cid)) return res.status(400).json({ message: "Invalid course ID" });
  try {
    const assignments = await Assignment.find({ courseId: cid }).lean();
    res.json(assignments);
  } catch (e) {
    next(e);
  }
});

// POST /api/courses/:cid/assignments
router.post("/", requireAuth, async (req, res, next) => {
  const { cid } = req.params;
  const { title, dueDate, description, points } = req.body;
  if (!validateObjectId(cid)) return res.status(400).json({ message: "Invalid course ID" });
  if (!title) return res.status(400).json({ message: "Title required" });
  try {
    const assignment = await Assignment.create({ courseId: cid, title, dueDate, description, points });
    res.status(201).json(assignment);
  } catch (e) {
    next(e);
  }
});

// GET /api/courses/:cid/assignments/:aid
router.get("/:aid", requireAuth, async (req, res, next) => {
  const { cid, aid } = req.params;
  if (!validateObjectId(cid) || !validateObjectId(aid))
    return res.status(400).json({ message: "Invalid ID(s)" });
  try {
    const assg = await Assignment.findOne({ _id: aid, courseId: cid }).lean();
    if (!assg) return res.status(404).json({ message: "Assignment not found" });
    res.json(assg);
  } catch (e) {
    next(e);
  }
});

// PUT /api/courses/:cid/assignments/:aid
router.put("/:aid", requireAuth, async (req, res, next) => {
  const { cid, aid } = req.params;
  if (!validateObjectId(cid) || !validateObjectId(aid))
    return res.status(400).json({ message: "Invalid ID(s)" });
  try {
    const updated = await Assignment.findOneAndUpdate(
      { _id: aid, courseId: cid },
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
