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

const rid = () => Math.random().toString(36).slice(2, 10);

const USERS_KEY = "kambaz-users";
const CURRENT_KEY = "kambaz-current-user-id";

function loadUsers(): User[] {
  const s = localStorage.getItem(USERS_KEY);
  return s ? JSON.parse(s) : [];
}
function saveUsers(list: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(list));
}
function saveCurrentUserId(id: string) {
  localStorage.setItem(CURRENT_KEY, id);
}

export default function Signup() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<User>({
    id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "student",
  });

  useEffect(() => setUsers(loadUsers()), []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const signup = () => {
    if (!form.username || !form.password) return alert("Username and password required.");
    if (users.some(u => u.username === form.username)) return alert("Username already exists.");
    const u: User = { ...form, id: rid() };
    const next = [...users, u];
    saveUsers(next);
    saveCurrentUserId(u.id);
    navigate("/Kambaz/Dashboard");
  };

  return (
    <div style={{ marginTop: 12 }}>
      <h3>Sign up</h3>
      <input name="username" placeholder="username" value={form.username} onChange={onChange} /><br/>
      <input name="password" type="password" placeholder="password" value={form.password || ""} onChange={onChange} /><br/>
      <input name="firstName" placeholder="First name" value={form.firstName || ""} onChange={onChange} /><br/>
      <input name="lastName" placeholder="Last name" value={form.lastName || ""} onChange={onChange} /><br/>
      <input name="email" type="email" placeholder="email" value={form.email || ""} onChange={onChange} /><br/>
      <select name="role" value={form.role || ""} onChange={onChange}>
        <option value="student">Student</option>
        <option value="faculty">Faculty</option>
        <option value="admin">Admin</option>
      </select><br/>
      <button onClick={signup}>Sign up</button>
      <Link to="/Kambaz/Account/Signin" style={{ marginLeft: 8 }}>Sign in</Link>
    </div>
  );
}
