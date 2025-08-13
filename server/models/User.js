// server/models/User.js  (CommonJS)
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email:    { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },     // (for class projects; hash in real apps)
    role:     { type: String, default: 'USER', enum: ['USER', 'STUDENT', 'INSTRUCTOR', 'ADMIN'] },
  },
  { timestamps: true }
);
router.get("/_version", (req, res) => {
  res.json({ signupReadsEmail: true });
});

module.exports = mongoose.model('User', UserSchema);
