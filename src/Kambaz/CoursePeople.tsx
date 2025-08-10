import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { courseUsers } from "./Courses/client";

type User = {
  _id?: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
};

export default function CoursePeople() {
  const { courseId = "" } = useParams();
  const [people, setPeople] = useState<User[]>([]);

  useEffect(() => {
    if (!courseId) return;
    courseUsers(courseId).then(setPeople);
  }, [courseId]);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h3 className="m-0">People</h3>
        <div className="d-flex gap-3">
          <Link to={`/Kambaz/Courses/${courseId}`}>Modules</Link>
          <Link to={`/Kambaz/Courses/${courseId}/Assignments`}>Assignments</Link>
          <Link to="/Kambaz/Dashboard">← Back to Dashboard</Link>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {people.map(p => (
            <tr key={p._id}>
              <td>{p.username}</td>
              <td>{[p.firstName, p.lastName].filter(Boolean).join(" ")}</td>
              <td>{p.email}</td>
              <td>{p.role}</td>
            </tr>
          ))}
          {!people.length && (
            <tr><td colSpan={4} className="text-secondary">No one enrolled yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
