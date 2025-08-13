// server/models/Assignment.js
const { Schema, model, Types } = require("mongoose");

const AssignmentSchema = new Schema(
  {
    course: { type: Types.ObjectId, ref: "Course", required: true, index: true },
    title: { type: String, required: true },
    points: { type: Number, default: 100 },
    dueDate: Date,
    description: String
  },
  { timestamps: true }
);

module.exports = model("Assignment", AssignmentSchema);
