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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Kambaz/Signin" replace />} />
      <Route path="/Kambaz/Signin" element={<Signin />} />
      <Route path="/Kambaz/Signup" element={<Signup />} />
      <Route path="/Kambaz/Dashboard" element={<Dashboard />} />

      {/* Course layout */}
      <Route path="/courses/:cid" element={<CourseLayout />}>
        <Route path="Home" element={<CourseHome />} />
        <Route path="Modules" element={<CourseModules />} />
        <Route
          path="modules/new"
          element={
            <ParamsGuard>
              <ModuleEditor />
            </ParamsGuard>
          }
        />
        <Route
          path="modules/:mid"
          element={
            <ParamsGuard>
              <ModuleEditor />
            </ParamsGuard>
          }
        />
        <Route
          path="assignments"
          element={
            <ParamsGuard>
              <Assignments />
            </ParamsGuard>
          }
        />
        <Route
          path="assignments/new"
          element={
            <ParamsGuard>
              <AssignmentEditor />
            </ParamsGuard>
          }
        />
        <Route
          path="assignments/:assignmentId"
          element={
            <ParamsGuard>
              <AssignmentEditor />
            </ParamsGuard>
          }
        />
        <Route
          path="People"
          element={
            <ParamsGuard>
              <People />
            </ParamsGuard>
          }
        />
      </Route>

      {/* Labs */}
      <Route path="/Kambaz/Lab1" element={<Lab1 />} />
      <Route path="/Kambaz/Lab2" element={<Lab2 />} />
      <Route path="/Kambaz/Lab3" element={<Lab3 />} />
      <Route path="/Kambaz/Lab4" element={<Lab4 />} />
      <Route path="/Kambaz/Lab5" element={<Lab5 />} />
      <Route path="/Kambaz/Lab6" element={<Lab6 />} />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/Kambaz/Signin" />} />
    </Routes>
  );
}

export default App;