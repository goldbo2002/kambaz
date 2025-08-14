// src/Kambaz/Screens/Courses.tsx
import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { Link } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    api.get("/courses")
      .then(res => setCourses(res.data))
      .catch(() => setCourses([]));
  }, []);

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    api.post("/courses", { title })
      .then(res => {
        setCourses(prev => [...prev, res.data]);
        setTitle("");
      })
      .catch(err => console.error("Course creation failed", err));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Courses</h2>

      <form onSubmit={handleAddCourse} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="form-control"
            placeholder="Enter course title"
          />
          <button className="btn btn-primary" type="submit">Add Course</button>
        </div>
      </form>

      {courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <ul className="list-group">
          {courses.map(course => (
            <li key={course._id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{course.title}</span>
              <Link to={`/courses/${course._id}/assignments`} className="btn btn-sm btn-outline-primary">
                View Assignments
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
