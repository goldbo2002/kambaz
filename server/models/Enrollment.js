import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "courses", required: true },
  },
  { timestamps: true, collection: "enrollments" }
);

// Prevent duplicate enrollments per (user, course)
EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

export default mongoose.model("enrollments", EnrollmentSchema);
