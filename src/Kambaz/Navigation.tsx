import { Link, useLocation } from "react-router-dom";
import "./Kambaz.css";

const navItems = [
  { path: "/Kambaz/account/signin", label: "Account" },
  { path: "/Kambaz/dashboard", label: "Dashboard" },
  { path: "/Kambaz/calendar", label: "Calendar" },
  { path: "/Kambaz/inbox", label: "Inbox" },
  { path: "/Labs", label: "Labs" }, // <-- Make sure this is /Labs with capital L
];

export default function Navigation() {
  const location = useLocation();
  return (
    <nav className="kambaz-sidebar">
      <div style={{ textAlign: "center", marginBottom: 24, fontWeight: "bold", fontSize: 22 }}>Kambaz</div>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={location.pathname.startsWith(item.path) ? "active" : ""}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
