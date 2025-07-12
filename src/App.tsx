import Labs from "./Labs";
import Lab2 from "./Labs/Lab2";
import Lab1 from "./Labs/Lab1"; // <--- Add this if you want Lab1 separately
import Kambaz from "./Kambaz";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Kambaz" />} />
        <Route path="/Labs" element={<Labs />} />
        <Route path="/Labs/Lab1" element={<Lab1 />} />
        <Route path="/Labs/Lab2" element={<Lab2 />} />
        <Route path="/Kambaz/*" element={<Kambaz />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
