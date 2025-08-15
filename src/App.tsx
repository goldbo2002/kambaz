import { Routes, Route, Navigate } from "react-router-dom";
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
import Modules from "./Kambaz/Courses/Modules";
import LabLayout from "./Labs/TOC";
import Labs from "./Labs";
import Lab1 from "./Labs/Lab1";
import Lab2 from "./Labs/Lab2";
import Lab3 from "./Labs/Lab3";
import Lab4 from "./Labs/Lab4";
import Lab5 from "./Labs/Lab5";
import Lab6 from "./Labs/Lab6";
import People from "./Kambaz/People/People";
import ParamsGuard from "./Kambaz/Components/ParamsGuard";
import TestPage from "./Kambaz/Test";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';
import { verifySession } from './redux/authSlice';
import PrivateRoute from "./Kambaz/Components/PrivateRoute";


export default function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log("🔥 App root mounted");
    dispatch(verifySession());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Kambaz/Signin" replace />} />
      <Route path="/Kambaz/Signin" element={<Signin />} />
      <Route path="/Kambaz/Signup" element={<Signup />} />

      <Route path="/Kambaz/Dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />

      <Route path="/Courses/:cid" element={
        <PrivateRoute>
          <CourseLayout />
        </PrivateRoute>
      }>
        <Route path="home" element={<CourseHome />} />
        <Route path="modules" element={<CourseModules />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="people" element={<People />} />
      </Route>

      <Route path="/account/profile" element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      } />

      <Route path="/labs" element={
        <PrivateRoute>
          <Labs />
        </PrivateRoute>
      }>
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2" element={<Lab2 />} />
        <Route path="Lab3" element={<Lab3 />} />
        <Route path="Lab4" element={<Lab4 />} />
        <Route path="Lab5" element={<Lab5 />} />
        <Route path="Lab6" element={<Lab6 />} />
      </Route>

      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
}