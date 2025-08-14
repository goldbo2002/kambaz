import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    api.get("/users/profile")
      .then(res => {
        setUser(res.data);
        return api.get("/courses");
      })
      .then(res => setCourses(res.data))
      .catch(() => {
        setUser(null);
        setCourses([]);
      });
  }, []);

  const name = user
    ? (user.firstName || user.lastName
        ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
        : user.username)
    : "User";

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div className="container mt-4" style={{ flexGrow: 1 }}>
        <h2 className="mb-4">Dashboard</h2>
        {user ? (
          <div className="alert alert-success">Welcome, {name}!</div>
        ) : (
          <div className="alert alert-warning">Not signed in.</div>
        )}

        <h4>Your Courses</h4>
        <ul className="list-group">
          {courses.map((course) => (
            <li key={course._id} className="list-group-item d-flex justify-content-between align-items-center">
              {course.title}
              <Link to={`/courses/${course._id}/assignments`} className="btn btn-sm btn-primary">
                Open
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
