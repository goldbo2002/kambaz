import { Routes, Route, Link } from "react-router-dom";
import Lab1 from "./Lab1";
import Lab2 from "./Lab2";

export default function Labs() {
  return (
    <div style={{ maxWidth: 700, margin: "2rem auto" }}>
      <h2>Labs – Robert Gold, 5610</h2>
      <nav style={{ marginBottom: 24 }}>
        <Link to="Lab1" style={{ marginRight: 20 }}>Lab 1</Link>
        <Link to="Lab2" style={{ marginRight: 20 }}>Lab 2</Link>
        <Link to="/" style={{ marginRight: 20 }}>Kambaz App</Link>
      </nav>
      <div style={{ marginTop: 20 }}>
        <strong>Source Code Repos:</strong>
        <ul>
          <li>
            <a
              href="https://github.com/yourusername/kanbaz-app"
              target="_blank"
              rel="noopener noreferrer"
            >Kambaz Repo</a>
          </li>
          <li>
            <a
              href="https://github.com/yourusername/labs"
              target="_blank"
              rel="noopener noreferrer"
            >Labs Repo</a>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2" element={<Lab2 />} />
      </Routes>
    </div>
  );
}
