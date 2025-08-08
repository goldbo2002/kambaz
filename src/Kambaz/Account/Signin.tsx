import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type User = {
  id: string;
  username: string;
  password?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
};

const USERS_KEY = "kambaz-users";
const CURRENT_KEY = "kambaz-current-user-id";

function loadUsers(): User[] {
  const s = localStorage.getItem(USERS_KEY);
  return s ? JSON.parse(s) : [];
}

function saveCurrentUserId(id: string) {
  localStorage.setItem(CURRENT_KEY, id);
}

export default function Signin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState({ username: "", password: "" });

  useEffect(() => {
    setUsers(loadUsers());
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const signin = () => {
    const u = users.find(
      (x) => x.username === form.username && (x.password ?? "") === form.password
    );
    if (!u) return alert("Invalid credentials.");
    saveCurrentUserId(u.id);
    navigate("/Kambaz/Dashboard");
  };

  return (
    <div style={{ marginTop: 12 }}>
      <h3>Sign in</h3>
      <input
        name="username"
        placeholder="username"
        value={form.username}
        onChange={onChange}
        style={{ marginBottom: 8 }}
      /><br />
      <input
        name="password"
        type="password"
        placeholder="password"
        value={form.password}
        onChange={onChange}
        style={{ marginBottom: 8 }}
      /><br />
      <button onClick={signin} id="wd-signin-btn">Sign in</button>
      <Link to="/Kambaz/Account/Signup" id="wd-signup-link" style={{ marginLeft: 8 }}>
        Sign up
      </Link>
    </div>
  );
}
