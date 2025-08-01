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
        <nav style={{ marginBottom: 24 }}>
          <Link to="account/signin">Signin</Link>{" | "}
          <Link to="account/signup">Signup</Link>{" | "}
          <Link to="account/profile">Profile</Link>{" | "}
          <Link to="dashboard">Dashboard</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h1>Kambaz Home</h1>} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="Course/:id" element={<CourseDetail />} />
          <Route path="account/*" element={<Account />} />
          <Route path="*" element={<h2>Not found</h2>} />
        </Routes>
      </div>
    </div>
  );
}
