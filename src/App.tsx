import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Labs from "./Labs";
import Kambaz from "./Kambaz";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Default to Kambaz dashboard */}
        <Route path="/" element={<Navigate to="/Kambaz" />} />
        {/* Main Kambaz app/dashboard route */}
        <Route path="/Kambaz/*" element={<Kambaz />} />
        {/* All Labs under the Labs route (with nested labs routing) */}
        <Route path="/Labs/*" element={<Labs />} />
      </Routes>
    </HashRouter>
  );
}
