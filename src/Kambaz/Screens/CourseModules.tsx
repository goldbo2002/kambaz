import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../lib/api";

export default function CourseModules() {
  const { cid } = useParams<{ cid?: string }>();
  const navigate = useNavigate();
  const [modules, setModules] = useState<{ _id: string; title: string }[]>([]);

  useEffect(() => {
    if (!cid) return;
    api.get(`/modules/${cid}`)
      .then((res) => setModules(res.data))
      .catch((err) => console.error("Failed to load modules:", err));
  }, [cid]);

  if (!cid) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h3>Modules</h3>
      <button className="btn btn-primary mb-3" onClick={() => navigate(`/courses/${cid}/modules/new`)}>
        + Module
      </button>

      <ul className="list-group">
        {modules.map((mod) => (
          <li
            key={mod._id}
            className="list-group-item"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/courses/${cid}/modules/${mod._id}`)}
          >
            {mod.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
