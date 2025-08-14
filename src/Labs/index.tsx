import { Routes, Route, Link } from "react-router-dom";
import Lab1 from "./Lab1";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import Lab4 from "./Lab4";
import Lab5 from "./Lab5";
import Lab6 from "./Lab6";
import "./labs.css";

export default function Labs() {
  return (
    <div className="container mt-3">
      <h1>Labs</h1>

      <ul className="nav nav-tabs mb-3">
        <li className="nav-item"><Link to="Lab1" className="nav-link">Lab 1</Link></li>
        <li className="nav-item"><Link to="Lab2" className="nav-link">Lab 2</Link></li>
        <li className="nav-item"><Link to="Lab3" className="nav-link">Lab 3</Link></li>
        <li className="nav-item"><Link to="Lab4" className="nav-link">Lab 4</Link></li>
        <li className="nav-item"><Link to="Lab5" className="nav-link">Lab 5</Link></li>
        <li className="nav-item"><Link to="Lab6" className="nav-link">Lab 6</Link></li>
      </ul>

      <Routes>
        <Route path="Lab1/*" element={<Lab1 />} />
        <Route path="Lab2/*" element={<Lab2 />} />
        <Route path="Lab3/*" element={<Lab3 />} />
        <Route path="Lab4/*" element={<Lab4 />} />
        <Route path="Lab5/*" element={<Lab5 />} />
        <Route path="Lab6/*" element={<Lab6 />} />
      </Routes>
    </div>
  );
}