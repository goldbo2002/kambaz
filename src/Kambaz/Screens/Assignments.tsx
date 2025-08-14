import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function Assignments() {
  const { cid } = useParams();
  const nav = useNavigate();
  const [assignments, setAssignments] = useState<any[]>([]);

useEffect(() => {
  if (!cid) return;
  api.get(`/courses/${cid}/assignments`)
    .then((res) => setAssignments(res.data))
    .catch((err) => console.error("Assignments fetch failed", err));
}, [cid]);
  return (
    <div className="container mt-4">
      <h3>Assignments</h3>

      <div className="mb-3">
        <button className="btn btn-secondary me-2" onClick={() => alert("Group creation not implemented")}>
          + Group
        </button>
       <button className="btn btn-primary mb-3" onClick={() => nav(`/courses/${cid}/assignments/new`)}>
  + Assignment
</button>

      </div>
      
      <ul className="list-group">
        {assignments.map((a) => (
          <li key={a._id} className="list-group-item d-flex justify-content-between align-items-center"
              onClick={() => nav(`/courses/${cid}/assignments/${a._id}`)}
              style={{ cursor: "pointer" }}>
            <div>
              <div><strong>{a.title}</strong></div>
              <div className="text-muted small">
                Due: {a.dueDate?.slice(0, 10) || "N/A"} • {a.points} pts
              </div>
            </div>
            <i className="bi bi-chevron-right"></i>
          </li>
        ))}
      </ul>
    </div>
  );
}
