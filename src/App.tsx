import { Routes, Route, Navigate } from "react-router-dom";
import Labs from "./Labs";
import Kambaz from "./Kambaz";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Kambaz/Account/Signin" replace />} />
      <Route path="/Labs/*" element={<Labs />} />
      <Route path="/Kambaz/*" element={<Kambaz />} />
      <Route path="*" element={<div className="p-3">Not found</div>} />
    </Routes>
  );
}
