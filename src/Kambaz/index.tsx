import { Routes, Route, Navigate } from "react-router";
import Dashboard from "./Dashboard";
import Account from "./Account";
import CourseDetail from "./CourseDetail";
import Assignments from "./Assignments";
import CoursePeople from "./CoursePeople";
import People from "./People";
import KambazNavigation from "./Navigation";

export default function Kambaz() {
  return (
    <div id="wd-kambaz">
      {/* Layout: nav left, content right */}
      <table>
        <tbody>
          <tr>
            <td valign="top">
              <KambazNavigation />
            </td>
            <td valign="top" style={{ width: "100%" }}>
              <Routes>
                {/* Default screen */}
                <Route path="/" element={<Navigate to="/Kambaz/Dashboard" />} />

                {/* Main sections */}
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Account/*" element={<Account />} />
                <Route path="/People" element={<People />} /> {/* Global People */}

                {/* Per-course sections */}
                <Route path="/Courses/:courseId" element={<CourseDetail />} />
                <Route path="/Courses/:courseId/Assignments" element={<Assignments />} />
                <Route path="/Courses/:courseId/People" element={<CoursePeople />} />
              </Routes>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
