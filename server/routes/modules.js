import express from "express";
import mongoose from "mongoose";
import Module from "../models/Module.js";

const router = express.Router();

function requireAuth(req, res, next) {
  if (!req.session?.user) return res.status(401).json({ message: "Unauthorized" });
  next();
}

router.get("/", async (req, res, next) => {
  try {
    const cid = req.params.cid;
    if (!mongoose.Types.ObjectId.isValid(cid)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    const modules = await Module.find({ courseId: cid }).lean();
    res.json(modules);
  } catch (e) {
    next(e);
  }
});

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const cid = req.params.cid;
    const { title } = req.body;

    if (!mongoose.Types.ObjectId.isValid(cid)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    if (!title) return res.status(400).json({ message: "Title required" });

    const mod = await Module.create({ courseId: cid, title });
    res.status(201).json(mod);
  } catch (e) {
    next(e);
  }
});

router.get("/:mid", async (req, res, next) => {
  try {
    const { cid, mid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(mid)) {
      return res.status(400).json({ message: "Invalid ID(s)" });
    }

    const mod = await Module.findOne({ _id: mid, courseId: cid }).lean();
    if (!mod) return res.status(404).json({ message: "Module not found" });

    res.json(mod);
  } catch (e) {
    next(e);
  }
});

router.put("/:mid", requireAuth, async (req, res, next) => {
  try {
    const { cid, mid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(mid)) {
      return res.status(400).json({ message: "Invalid ID(s)" });
    }

    const updated = await Module.findOneAndUpdate(
      { _id: mid, courseId: cid },
      req.body,
      { new: true, runValidators: true }
    ).lean();

    if (!updated) return res.status(404).json({ message: "Module not found" });
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

export default router;
