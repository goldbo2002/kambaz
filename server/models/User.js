import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username:  { type: String, required: true, unique: true, trim: true },
    email:     { type: String, required: true, unique: true, trim: true },
    password:  { type: String, required: true },
    role:      { type: String, default: 'USER', enum: ['USER', 'STUDENT', 'INSTRUCTOR', 'ADMIN'] },
    firstName: { type: String, trim: true },
    lastName:  { type: String, trim: true },
  },
  { timestamps: true }
);

// ✅ Export the model
const User = mongoose.model("User", UserSchema);
export default User;
