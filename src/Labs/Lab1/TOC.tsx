import { Link } from "react-router-dom";

export default function TOC() {
  return (
    <ul>
      <li><Link to="/Labs/Lab1">Lab 1</Link></li>
      <li><Link to="/Kambaz">Kambaz App</Link></li>
      <li><a href="https://github.com/YOUR_USERNAME/kambaz-react-web-app" target="_blank">GitHub Repo</a></li>
    </ul>
  );
}
