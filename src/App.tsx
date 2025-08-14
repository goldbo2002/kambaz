import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Signin from "./Kambaz/Account/Signin";
import Signup from "./Kambaz/Account/Signup";
import Profile from "./Kambaz/Account/Profile";
import Dashboard from "./Kambaz/Screens/Dashboard";
import CourseLayout from "./Kambaz/Screens/CourseLayout";
import CourseHome from "./Kambaz/Screens/CourseHome";
import CourseModules from "./Kambaz/Screens/CourseModules";
import ModuleEditor from "./Kambaz/Screens/ModuleEditor";
import Assignments from "./Kambaz/Screens/Assignments";
import AssignmentEditor from "./Kambaz/Screens/AssignmentEditor";
import AccountLayout from "./Kambaz/Account";
import LabLayout from "./Labs/TOC";
import Lab1 from "./Labs/Lab1";
import Lab2 from "./Labs/Lab2";
import Lab3 from "./Labs/Lab3";
import Lab4 from "./Labs/Lab4";
import Lab5 from "./Labs/Lab5";
import Lab6 from "./Labs/Lab6";
import People from "./Kambaz/People/People";
import ParamsGuard from "./Kambaz/Components/ParamsGuard";
export default function App() {
  return (
    <Route>
      <Routes>
        <Route path="/" element={<Navigate to="/Kambaz/Signin" replace />} />
        <Route path="/Kambaz/Signin" element={<Signin />} />
        <Route path="/Kambaz/Signup" element={<Signup />} />
        <Route path="/Kambaz/Dashboard" element={<Dashboard />} />

        <Route path="/courses/:cid/*" element={<CourseLayout />}>
          <Route path="Home" element={<CourseHome />} />
          <Route path="modules" element={<CourseModules />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="assignments/:aid" element={<AssignmentEditor />} />
        </Route>

        {/* Test route to validate routing */}
        <Route path="/test" element={<div style={{ padding: 20 }}>Test route working!</div>} />
      </Routes>
    </Route>
  );
}