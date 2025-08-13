import Module from "../models/Module.js";

export default function ModulesRoutes(app) {
  app.get("/api/courses/:cid/modules", async (req, res, next) => {
    try { res.json(await Module.find({ course: req.params.cid }).lean()); }
    catch (e) { next(e); }
  });

  app.post("/api/courses/:cid/modules", async (req, res, next) => {
    try { res.status(201).json(await Module.create({ ...req.body, course: req.params.cid })); }
    catch (e) { next(e); }
  });

  app.put("/api/modules/:mid", async (req, res, next) => {
    try { await Module.updateOne({ _id: req.params.mid }, { $set: req.body }); res.json({ ok: true }); }
    catch (e) { next(e); }
  });

  app.delete("/api/modules/:mid", async (req, res, next) => {
    try { await Module.deleteOne({ _id: req.params.mid }); res.json({ ok: true }); }
    catch (e) { next(e); }
  });
}
