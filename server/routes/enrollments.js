import Enrollment from "../models/Enrollment.js";

export default function EnrollmentsRoutes(app) {
  app.post("/api/enrollments/enroll", async (req, res, next) => {
    try { res.status(201).json(await Enrollment.create(req.body)); }
    catch (e) { next(e); }
  });

  app.post("/api/enrollments/unenroll", async (req, res, next) => {
    try { await Enrollment.deleteOne(req.body); res.json({ ok: true }); }
    catch (e) { next(e); }
  });

  // My courses by session user
  app.get("/api/enrollments/my", async (req, res, next) => {
    try {
      if (!req.session?.currentUser) return res.sendStatus(401);
      const list = await Enrollment.find({ user: req.session.currentUser._id }).populate("course").lean();
      res.json(list);
    } catch (e) { next(e); }
  });

  // People in a course
  app.get("/api/courses/:cid/people", async (req, res, next) => {
    try {
      const list = await Enrollment.find({ course: req.params.cid }).populate("user", "-password").lean();
      res.json(list.map(e => e.user));
    } catch (e) { next(e); }
  });
}
