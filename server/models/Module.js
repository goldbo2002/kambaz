// server/models/Module.js
const { Schema, model, Types } = require("mongoose");

const ModuleSchema = new Schema(
  {
    course: { type: Types.ObjectId, ref: "Course", required: true, index: true },
    name: { type: String, required: true },
    description: String
  },
  { timestamps: true }
);

module.exports = model("Module", ModuleSchema);
