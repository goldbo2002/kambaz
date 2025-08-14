import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "220px",
        backgroundColor: "#f8f9fa",
        padding: "1rem",
        height: "100vh",
        borderRight: "1px solid #ddd"
      }}
    >
      <h4>Navigation</h4>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/account/profile">Profile</Link>
        </li>
        <li>
          <Link to="/courses/1">Course Home</Link>
        </li>
        <li>
          <Link to="/courses/1/modules">Modules</Link>
        </li>
        <li>
          <Link to="/courses/1/assignments">Assignments</Link>
        </li>
      </ul>
    </aside>
  );
}
