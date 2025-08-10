import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Labs from "./Labs";
import Kambaz from "./Kambaz";

import Lab1 from "./Labs/Lab1";
import Lab2 from "./Labs/Lab2";
import Lab3 from "./Labs/Lab3";
import Lab4 from "./Labs/Lab4";
import Lab5 from "./Labs/Lab5";
import Lab6 from "./Labs/Lab6";  

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Kambaz" />} />

        <Route path="/Kambaz/*" element={<Kambaz />} />

        <Route path="/Labs/*" element={<Labs />}>
          <Route path="lab1" element={<Lab1 />} />
          <Route path="lab2" element={<Lab2 />} />
          <Route path="lab3" element={<Lab3 />} />
          <Route path="lab4" element={<Lab4 />} />
          <Route path="lab5" element={<Lab5 />} />
          <Route path="lab6" element={<Lab6 />} />  {/* <-- ADD THIS */}
        </Route>
      </Routes>
    </HashRouter>
  );
}
