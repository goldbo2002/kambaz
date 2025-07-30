import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="Signin">Signin</Link></li>
        <li><Link to="Signup">Signup</Link></li>
        <li><Link to="Profile">Profile</Link></li>
      </ul>
    </nav>
  );
}
