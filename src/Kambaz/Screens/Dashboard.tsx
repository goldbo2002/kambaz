import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import Sidebar from "./Sidebar";
export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);

useEffect(() => {
  api
    .get("/courses")
    .then((res: { data: any[] }) => setCourses(res.data))
    .catch((err: unknown) => {
      console.error("🔥 Failed to fetch courses", err);
    });
}, []);

  if (!user) return <p>Loading or unauthorized...</p>;
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div className="container mt-4" style={{ flexGrow: 1 }}>
        <h2>Dashboard</h2>
        <div className={user ? "alert alert-success" : "alert alert-warning"}>
          {user ? `Welcome, ${user.username}` : "Not signed in."}
        </div>

        <h4>Your Courses</h4>
        <ul className="list-group">
          {courses.map(course => {
            console.log("COURSE OBJECT:", course); // For debugging
            return (
              <li key={course._id} className="list-group-item d-flex justify-content-between align-items-center">
                {course.title}
                <Link to={`/courses/${course._id}/assignments`} className="btn btn-sm btn-primary">
                  Open Assignments
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}