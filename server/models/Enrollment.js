// server/models/Enrollment.js
const { Schema, model, Types } = require("mongoose");

const EnrollmentSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User", required: true, index: true },
    course: { type: Types.ObjectId, ref: "Course", required: true, index: true }
  },
  { timestamps: true }
);

// optional: prevent duplicate enrollment
EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

module.exports = model("Enrollment", EnrollmentSchema);
