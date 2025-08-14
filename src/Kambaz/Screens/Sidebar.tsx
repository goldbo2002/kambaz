// src/Kambaz/Screens/Sidebar.tsx
import { Link, useParams } from "react-router-dom";

export default function Sidebar({ cid }: { cid?: string }) {
  const routeCid = cid || useParams<{ cid?: string }>().cid || "";
  return (
    <aside style={{ width: "220px", padding: "1rem", background: "#f8f9fa", borderRight: "1px solid #ddd" }}>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        <li><Link to="/Kambaz/Dashboard">Dashboard</Link></li>
        <li><Link to="/account/profile">Profile</Link></li>
        <li><Link to={`/courses/${routeCid}/Home`}>Home</Link></li>
        <li><Link to={`/courses/${routeCid}/modules`}>Modules</Link></li>
        <li><Link to={`/courses/${routeCid}/assignments`}>Assignments</Link></li>
        <li><Link to="/test">Test Route</Link></li>
      </ul>
    </aside>
  );
}
