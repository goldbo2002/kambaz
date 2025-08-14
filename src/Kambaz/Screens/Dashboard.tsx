import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import Sidebar from "./Sidebar"; // 👈 this line added

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    api.get("/users/profile")
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const name = user
    ? (user.firstName || user.lastName
        ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
        : user.username)
    : "User";

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar /> {/* 👈 now rendering the sidebar */}
      <div className="container mt-4" style={{ flexGrow: 1 }}>
        <h2 className="mb-4">Dashboard</h2>
        {user ? (
          <div className="alert alert-success">Welcome, {name}!</div>
        ) : (
          <div className="alert alert-warning">Not signed in.</div>
        )}
        <p>Use the sidebar to navigate your courses, profile, and assignments.</p>
      </div>
    </div>
  );
}
