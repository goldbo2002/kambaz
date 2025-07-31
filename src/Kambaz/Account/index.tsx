// src/Kambaz/Account/index.tsx
import { Routes, Route, Link } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";

export default function Account() {
  return (
    <div>
      {/* Kambaz Account section links */}
      <nav style={{ marginBottom: 16 }}>
        <Link to="signin">Signin</Link>{" | "}
        <Link to="signup">Signup</Link>{" | "}
        <Link to="profile">Profile</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </div>
  );
}
