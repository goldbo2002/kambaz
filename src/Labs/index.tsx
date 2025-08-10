import { Link, Outlet } from "react-router-dom";

export default function Labs() {
  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>Labs – Bo Gold, Section 5160</h2>
      <ul>
        <li><Link to="/Labs/lab1">Lab 1: HTML/CSS</Link></li>
        <li><Link to="/Labs/lab2">Lab 2: CSS/Bootstrap</Link></li>
        <li><Link to="/Labs/lab3">Lab 3: JavaScript, Arrays, React</Link></li>
        <li><Link to="/Labs/lab4">Lab 4: State + Redux</Link></li>
        <li><Link to="/Labs/lab5">Lab 5: Express/REST</Link></li>
        <li><Link to="/Labs/lab6">Lab 6: Mongo + Sessions</Link></li>
      </ul>

      <Link to="/Kambaz" style={{ marginRight: 16 }}>← Back to Kambaz App</Link>

      <div style={{ marginTop: 14 }}>
        <strong>Source Code Repos:</strong>
        <ul>
          <li>
            <a href="https://github.com/goldbo2002/kambaz" target="_blank" rel="noopener noreferrer">
              Kambaz Repo
            </a>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
}
