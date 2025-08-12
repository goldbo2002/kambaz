// src/Kambaz/index.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Navigation from "./Navigation";

import Dashboard from "./Dashboard";
import People from "./People";
import Account from "./Account";            // this should be your /Kambaz/Account router
import CourseDetail from "./CourseDetail";  // default view for a course
import CoursePeople from "./CoursePeople";
import Assignments from "./Assignments";

import { currentUser } from "./Account/client";

export default function Kambaz() {
  const [setMe] = useState<any | null>(null);

  // ✅ Lab 6 requirement: reloading the browser maintains login
  useEffect(() => {
    currentUser().then(setMe).catch(() => setMe(null));
  }, []);

  return (
    <div className="wd-kambaz">
      <Header />
      <div className="d-flex">
        <Sidebar />
        <div className="flex-fill p-3">
          <Navigation />

          <Routes>
            {/* Default route for /Kambaz */}
            <Route path="/" element={<Navigate to="/Kambaz/Dashboard" />} />

            {/* Account (Signin/Signup/Profile handled inside) */}
            <Route path="/Account/*" element={<Account />} />

            {/* Main screens */}
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Users" element={<People />} />

            {/* Course shell + tabs */}
            <Route path="/Courses/:courseId" element={<CourseDetail />} />
            <Route path="/Courses/:courseId/People" element={<CoursePeople />} />
            <Route path="/Courses/:courseId/Assignments" element={<Assignments />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
