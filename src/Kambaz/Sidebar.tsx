import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav style={{ minWidth: 180 }}>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/Kambaz">Dashboard</Link></li>
        <li><Link to="/Kambaz/Account/Signin">Account</Link></li>
        <li><Link to="/Kambaz/Dashboard">Dashboard</Link></li>
        <li><Link to="/Kambaz/Course">Course</Link></li>
        <li><Link to="/Kambaz/Calendar">Calendar</Link></li>
        <li><Link to="/Kambaz/Inbox">Inbox</Link></li>
        <li>
          <Link to="/labs">🧪 Labs</Link>
        </li>
      </ul>
    </nav>
  );
}
