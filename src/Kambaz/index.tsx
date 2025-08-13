import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import "./Kambaz.css";

import Signin from "./Account/Signin";
import Signup from "./Account/Signup";
import Profile from "./Account/Profile";

import Dashboard from "./Screens/Dashboard";
import CourseLayout from "./Screens/CourseLayout";
import CourseHome from "./Screens/CourseHome";
import CourseModules from "./Screens/CourseModules";
import Assignments from "./Screens/Assignments";
import AssignmentEditor from "./Screens/AssignmentEditor";
import People from "./People/People";

export default function Kambaz() {
  return (
    <div className="wd-kb d-flex">
      <aside className="wd-kb-left-nav">
        <KBLink to="/Kambaz/Account/Signin" label="Account" />
        <KBLink to="/Kambaz/Dashboard" label="Dashboard" />
        {/* Courses points to Dashboard (DON'T hardcode /Courses/1234) */}
        <KBLink to="/Kambaz/Dashboard" label="Courses" />
        <KBLink to="/Labs" label="Labs" />
      </aside>
      <main className="flex-fill p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Account/Signin" replace />} />
          <Route path="Account">
            <Route path="Signin" element={<Signin />} />
            <Route path="Signup" element={<Signup />} />
            <Route path="Profile" element={<Profile />} />
          </Route>
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Courses/:cid" element={<CourseLayout />}>
            <Route index element={<Navigate to="Home" replace />} />
            <Route path="Home" element={<CourseHome />} />
            <Route path="Modules" element={<CourseModules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="People" element={<People />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}
function KBLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink to={to} className={({ isActive }) => "wd-kb-left-link " + (isActive ? "active" : "")}>
      {label}
    </NavLink>
  );
}
