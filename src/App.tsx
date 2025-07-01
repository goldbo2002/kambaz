import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Labs from "./Labs/Lab1";
import Kambaz from "./Kambaz";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Kambaz" />} />
        <Route path="/Labs/*" element={<Labs />} />
        <Route path="/Kambaz/*" element={<Kambaz />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
