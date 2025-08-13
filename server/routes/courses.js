// server/routes/courses.js
const Course = require('../models/Course');

// Auth middleware
function requireAuth(req, res, next) {
  if (!req.session?.user) return res.status(401).json({ message: 'Unauthorized' });
  next();
}

module.exports = function CoursesRoutes(app) {
  // List (open)
  app.get('/api/courses', async (_req, res, next) => {
    try {
      const docs = await Course.find().lean();
      res.json(docs);
    } catch (e) { next(e); }
  });

  // Create (auth required)
  app.post('/api/courses', requireAuth, async (req, res, next) => {
    try {
      const { title, description = '', number = '', image = '' } = req.body || {};
      if (!title) return res.status(400).json({ message: 'title required' });

      const created = await Course.create({ title, description, number, image });
      res.status(201).json(created);
    } catch (e) { next(e); }
  });

  // Read one (open)
  app.get('/api/courses/:cid', async (req, res, next) => {
    try {
      const doc = await Course.findById(req.params.cid).lean();
      if (!doc) return res.status(404).json({ message: 'not found' });
      res.json(doc);
    } catch (e) { next(e); }
  });

  // Update (auth required)
  app.put('/api/courses/:cid', requireAuth, async (req, res, next) => {
    try {
      const updated = await Course.findByIdAndUpdate(
        req.params.cid,
        req.body,
        { new: true, runValidators: true }
      ).lean();
      if (!updated) return res.status(404).json({ message: 'not found' });
      res.json(updated);
    } catch (e) { next(e); }
  });

  // Delete (auth required)
  app.delete('/api/courses/:cid', requireAuth, async (req, res, next) => {
    try {
      const deleted = await Course.findByIdAndDelete(req.params.cid).lean();
      if (!deleted) return res.status(404).json({ message: 'not found' });
      res.json({ ok: true, id: deleted._id });
    } catch (e) { next(e); }
  });
};
