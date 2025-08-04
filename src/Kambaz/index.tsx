import { Link, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Dashboard from "./Dashboard";
import CourseDetail from "./CourseDetail";
import Account from "./Account";

export default function Kambaz() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Navigation />
      <div style={{ flex: 1, padding: 32 }}>
        {/* Add a visible Back to Labs button */}
        <nav style={{ marginBottom: 24 }}>
          <Link to="/Labs">Back to Labs</Link>{" | "}
          <Link to="/Kambaz/account/signin">Signin</Link>{" | "}
          <Link to="/Kambaz/account/signup">Signup</Link>{" | "}
          <Link to="/Kambaz/account/profile">Profile</Link>{" | "}
          <Link to="/Kambaz/dashboard">Dashboard</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="Course/:id" element={<CourseDetail />} />
          <Route path="account/*" element={<Account />} />
          <Route path="*" element={<h2>Not found</h2>} />
        </Routes>
      </div>
    </div>
  );
}
