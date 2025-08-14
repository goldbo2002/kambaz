import { Routes, Route, Navigate, Link } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";

export default function Account() {
  return (
    <div className="p-3">
      <h2>Account</h2>
      <div className="mb-3">
        <Link to="/account/signin" className="btn btn-primary me-2">Sign In</Link>
        <Link to="/account/signup" className="btn btn-secondary">Sign Up</Link>
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="/account/signin" />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </div>
  );
}
