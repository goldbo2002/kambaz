// server/models/Course.js  (CommonJS)
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CourseSchema = new Schema(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    number:      { type: String, default: '' },
    image:       { type: String, default: '' },
    published:   { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = model('Course', CourseSchema);
