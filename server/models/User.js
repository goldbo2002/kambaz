import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username:  { type: String, required: true, unique: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  firstName: { type: String },
  lastName:  { type: String },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;
