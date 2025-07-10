import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Labs from "./Labs/Lab1";
import Kambaz from "./Kambaz";
import Lab2 from "./Labs/Lab2";



function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Kambaz" />} />
        <Route path="/Labs/*" element={<Labs />} />
        <Route path="/Kambaz/*" element={<Kambaz />} />
        <Route path="/Labs/Lab2" element={<Lab2 />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
