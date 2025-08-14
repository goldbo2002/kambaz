import { BrowserRouter, Routes, Route } from "react-router-dom";
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
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/account/*" element={<AccountLayout />}>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/courses/:cid/*" element={<CourseLayout />}>
        <Route index element={<CourseHome />} />
        <Route path="modules" element={<CourseModules />} />
        <Route path="modules/new" element={<ModuleEditor />} />
        <Route path="modules/:mid" element={<ModuleEditor />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="assignments/new" element={<AssignmentEditor />} />
        <Route path="assignments/:aid" element={<AssignmentEditor />} />
      </Route>

      <Route path="/labs/*" element={<LabLayout />}>
        <Route path="lab1" element={<Lab1 />} />
        <Route path="lab2" element={<Lab2 />} />
        <Route path="lab3" element={<Lab3 />} />
        <Route path="lab4" element={<Lab4 />} />
        <Route path="lab5" element={<Lab5 />} />
        <Route path="lab6" element={<Lab6 />} />
      </Route>

      <Route path="*" element={<div className="p-3">Not found</div>} />
    </Routes>
  );
}