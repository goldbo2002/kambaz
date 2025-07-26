import { Routes, Route, Link } from "react-router-dom";
import Lab1 from "./Lab1";
import Lab2 from "./Lab2";

export default function Labs() {
  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>Labs – Bo Gold, Section 5160</h2>
      <ul>
        <li><Link to="/labs/lab1">Lab 1: HTML/CSS</Link></li>
        <li><Link to="/labs/lab2">Lab 2: CSS/Bootstrap</Link></li>
        <li><Link to="/labs/lab3">Lab 3: JavaScript, Arrays, React</Link></li>
      </ul>

      <Link to="/" style={{ marginRight: 16 }}>← Back to Kambaz App</Link>

      <div style={{ marginTop: 14 }}>
        <strong>Source Code Repos:</strong>
        <ul>
          <li><a href="https://github.com/goldbo2002/kambaz-app" target="_blank"  rel="noopener noreferrer">Kambaz Repo</a></li>
          <li><a href="https://github.com/goldbo2002/labs" target="_blank"  rel="noopener noreferrer">Labs Repo</a></li>
        </ul>
      </div>

      {/* Here's the missing part — it renders lab pages */}
      <Routes>
        <Route path="lab1" element={<Lab1 />} />
        <Route path="lab2" element={<Lab2 />} />
      </Routes>
    </div>
  );
}
