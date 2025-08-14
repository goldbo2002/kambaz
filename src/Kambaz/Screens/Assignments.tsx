import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";


const Assignments = () => {
  const { cid } = useParams<{ cid?: string }>();
  const [assignments, setAssignments] = useState<any[]>([]);

  useEffect(() => {
    if (!cid) {
      console.error("❌ Missing course ID in Assignments");
      return;
    }

    api
      .get(`/assignments/${cid}`)
      .then((res) => setAssignments(res.data))
      .catch((err) => console.error("🔥 Failed to fetch assignments", err));
  }, [cid]);

  return (
    <div>
      <h2>Assignments</h2>
      <ul>
        {assignments.map((a) => (
          <li key={a._id}>{a.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Assignments;
