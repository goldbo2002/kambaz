// src/Kambaz/index.tsx
import { Link, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Dashboard from "./Dashboard";
import Account from "./Account";

export default function Kambaz() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar navigation for Kambaz */}
      <Navigation />

      {/* Main Kambaz content */}
      <div style={{ flex: 1, padding: 32 }}>
        {/* Links for sub-pages */}
        <nav style={{ marginBottom: 24 }}>
          <Link to="account/signin">Signin</Link>{" | "}
          <Link to="account/signup">Signup</Link>{" | "}
          <Link to="account/profile">Profile</Link>{" | "}
          <Link to="dashboard">Dashboard</Link>
        </nav>

        {/* Kambaz subpages */}
        <Routes>
          <Route path="/" element={<h1>Kambaz Home</h1>} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="account/*" element={<Account />} />
          {/* fallback route */}
          <Route path="*" element={<h2>Not found</h2>} />
        </Routes>
      </div>
    </div>
  );
}
