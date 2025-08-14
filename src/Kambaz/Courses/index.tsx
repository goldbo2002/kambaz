import { Route, Routes } from "react-router-dom";
import CourseLayout from "../Screens/CourseLayout";
import Dashboard from "../Screens/Dashboard";
import CourseModules from "../Screens/CourseModules";
import Assignments from "../Screens/Assignments";
import AssignmentEditor from "../Screens/AssignmentEditor";

export default function CourseRoutes() {
  return (
    <Routes>
      <Route path=":cid" element={<CourseLayout />}>
        <Route path="" element={<Dashboard />} />
        <Route path="Modules" element={<CourseModules />} />
        <Route path="Assignments" element={<Assignments />} />
        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
      </Route>
    </Routes>
  );
}