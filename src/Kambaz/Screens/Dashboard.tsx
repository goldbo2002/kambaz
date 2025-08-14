import { useEffect, useState } from "react";
import axios from "axios";

const SERVER = "https://kambaz.onrender.com";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    axios
      .get(`${SERVER}/api/users/profile`, { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const getName = () => {
    if (!user) return "User";
    if (user.firstName || user.lastName)
      return `${user.firstName || ""} ${user.lastName || ""}`.trim();
    return user.username;
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard</h2>
      {user ? (
        <div className="alert alert-success">Welcome, {getName()}!</div>
      ) : (
        <div className="alert alert-warning">Not signed in.</div>
      )}
      <p>Use the sidebar to navigate your courses, profile, and assignments.</p>
    </div>
  );
}
