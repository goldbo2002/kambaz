import Assignment from "../models/Assignment.js";

export default function AssignmentsRoutes(app) {
  app.get("/api/courses/:cid/assignments", async (req, res, next) => {
    try { res.json(await Assignment.find({ course: req.params.cid }).lean()); }
    catch (e) { next(e); }
  });

  app.post("/api/courses/:cid/assignments", async (req, res, next) => {
    try { res.status(201).json(await Assignment.create({ ...req.body, course: req.params.cid })); }
    catch (e) { next(e); }
  });

  app.put("/api/assignments/:aid", async (req, res, next) => {
    try { await Assignment.updateOne({ _id: req.params.aid }, { $set: req.body }); res.json({ ok: true }); }
    catch (e) { next(e); }
  });

  app.delete("/api/assignments/:aid", async (req, res, next) => {
    try { await Assignment.deleteOne({ _id: req.params.aid }); res.json({ ok: true }); }
    catch (e) { next(e); }
  });
}
