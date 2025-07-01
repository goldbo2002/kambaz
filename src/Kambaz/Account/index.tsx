import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import Navigation from "./Navigation";

export default function Account() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="Signin" />} />
        <Route path="Signin" element={<Signin />} />
        <Route path="Signup" element={<Signup />} />
        <Route path="Profile" element={<Profile />} />
      </Routes>
    </div>
  );
}
