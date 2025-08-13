
const User = require('../models/User');

function sanitizeUser(doc) {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : { ...doc };
  delete obj.password;
  return obj;
}

module.exports = function usersRoutes(app) {
  
  app.post('/api/users/signup', async (req, res, next) => {
    try {
      const { username, email, password, role } = req.body || {};
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'username, email, password required' });
      }
      const user = await User.create({ username, email, password, role });
      const safe = sanitizeUser(user);
      // store safe user in session
      req.session.user = safe;
      res.status(201).json(safe);
    } catch (e) {
    
      if (e?.code === 11000) {
        const field = Object.keys(e.keyPattern || {})[0] || 'field';
        return res.status(400).json({ message: `duplicate ${field}` });
      }
      next(e);
    }
  });

  // GET /api/users/current  
  app.get('/api/users/current', (req, res) => {
    if (!req.session?.user) return res.status(401).json({ message: 'Unauthorized' });
   
    const safe = sanitizeUser(req.session.user);
    res.json(safe);
  });

  // POST /api/users/signout
  app.post('/api/users/signout', (req, res) => {
    req.session?.destroy?.(() => {});
    res.json({ ok: true });
  });
};
