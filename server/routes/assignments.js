const express = require("express");
const Assignment = require("../models/Assignment");

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const docs = await Assignment.find().lean();
    res.json(docs);
  } catch (e) { next(e); }
});

router.post("/", async (req, res, next) => {
  try {
    const created = await Assignment.create(req.body);
    res.status(201).json(created);
  } catch (e) { next(e); }
});

router.get("/:id", async (req, res, next) => {
  try {
    const doc = await Assignment.findById(req.params.id).lean();
    if (!doc) return res.status(404).json({ message: "not found" });
    res.json(doc);
  } catch (e) { next(e); }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updated = await Assignment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).lean();
    if (!updated) return res.status(404).json({ message: "not found" });
    res.json(updated);
  } catch (e) { next(e); }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await Assignment.findByIdAndDelete(req.params.id).lean();
    if (!deleted) return res.status(404).json({ message: "not found" });
    res.json({ ok: true, id: deleted._id });
  } catch (e) { next(e); }
});

module.exports = router;
