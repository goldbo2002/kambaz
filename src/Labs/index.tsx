import { Routes, Route, Link } from "react-router-dom";
import Lab1 from "./Lab1";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import Lab4 from "./Lab4";

export default function Labs() {
  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>Labs – Bo Gold, Section 5160</h2>
      <ul>
        {/* Use RELATIVE links here */}
        <li><Link to="lab1">Lab 1: HTML/CSS</Link></li>
        <li><Link to="lab2">Lab 2: CSS/Bootstrap</Link></li>
        <li><Link to="lab3">Lab 3: JavaScript, Arrays, React</Link></li>
        <li><Link to="lab4">Lab 4: State + Redux</Link></li>
      </ul>

      {/* Always works */}
      <Link to="/Kambaz" style={{ marginRight: 16 }}>← Back to Kambaz App</Link>

      <div style={{ marginTop: 14 }}>
        <strong>Source Code Repos:</strong>
        <ul>
          <li>
            <a
              href="https://github.com/goldbo2002/kambaz"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kambaz Repo
            </a>
          </li>
        </ul>
      </div>

      {/* Nested routes: Labs show up under the TOC, not as a new page */}
      <Routes>
        <Route path="lab1" element={<Lab1 />} />
        <Route path="lab2" element={<Lab2 />} />
        <Route path="lab3" element={<Lab3 />} />
        <Route path="lab4" element={<Lab4 />} />
      </Routes>
    </div>
  );
}
