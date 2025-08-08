import { Link } from "react-router-dom";

export default function KambazNavigation() {
  return (
    <div id="wd-kambaz-navigation" style={{ padding: 16, minWidth: 220 }}>
      {/* External */}
      <a
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
        target="_blank"
        rel="noreferrer"
      >
        Northeastern
      </a>
      <br /><br />

      {/* App sections */}
      <div style={{ display: "grid", gap: 8 }}>
        <Link id="wd-account-link" to="/Kambaz/Account">Account</Link>
        <Link id="wd-dashboard-link" to="/Kambaz/Dashboard">Dashboard</Link>
        <Link id="wd-people-link" to="/Kambaz/People">People</Link>
        <Link id="wd-labs-link" to="/Labs">Labs</Link>
      </div>

      {/* Notes:
         - Course-specific nav (Modules/Assignments/People) is inside each course page header.
         - Global People lists/filters all users and supports +People/edit/delete.
      */}
    </div>
  );
}
