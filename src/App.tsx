import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Labs from "./Labs";
import Kambaz from "./Kambaz";
import Lab3 from "./Labs/Lab3";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Redirect root to Labs */}
        <Route path="/" element={<Navigate to="/Kambaz" />} />
        {/* Labs parent route */}
        <Route path="/Labs/*" element={<Labs />} />
        {/* Individual Lab route (optional) */}
        <Route path="/labs/lab3" element={<Lab3 />} />
        {/* Main Kambaz app/dashboard route */}
        <Route path="/Kambaz/*" element={<Kambaz />} />
      </Routes>
    </HashRouter>
  );
}
