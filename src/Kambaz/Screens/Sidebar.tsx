// src/Kambaz/Screens/Sidebar.tsx

import { Link, useParams } from "react-router-dom";

export default function Sidebar({ cid }: { cid?: string }) {
  const routeCid = useParams()?.cid;
  const courseId = cid || routeCid || "";

  return (
    <div className="bg-light p-3" style={{ width: "250px" }}>
      <h4>Sidebar</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to={`/courses/${courseId}/Home`}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={`/courses/${courseId}/Modules`}>Modules</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={`/courses/${courseId}/Assignments`}>Assignments</Link>
        </li>
      </ul>
    </div>
  );
}
