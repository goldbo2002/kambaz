import { useEffect, useMemo, useState } from "react";
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
function saveUsers(list: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(list));
}
function loadCurrentUserId(): string | null {
  return localStorage.getItem(CURRENT_KEY);
}
function clearCurrentUser() {
  localStorage.removeItem(CURRENT_KEY);
}

export default function Profile() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const currentId = useMemo(() => loadCurrentUserId(), []);
  const currentUser = useMemo(
    () => users.find(u => u.id === currentId) || null,
    [users, currentId]
  );
  const [form, setForm] = useState<Partial<User>>({});

  useEffect(() => {
    setUsers(loadUsers());
  }, []);

  useEffect(() => {
    if (currentUser) setForm(currentUser);
  }, [currentUser]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = () => {
    if (!currentUser) return;
    const next = users.map(u => (u.id === currentUser.id ? { ...u, ...form } as User : u));
    setUsers(next);
    saveUsers(next);
    alert("Profile updated!");
  };

  const logout = () => {
    clearCurrentUser();
    navigate("/Kambaz/Account/Signin");
  };

  if (!currentUser) {
    return (
      <div style={{ marginTop: 12 }}>
        <h3>Profile</h3>
        <p>No user signed in.</p>
        <Link to="/Kambaz/Account/Signin">Go to Sign in</Link>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 12 }}>
      <h3>Profile</h3>
      <input name="username" placeholder="username" value={form.username || ""} onChange={onChange} /><br/>
      <input name="password" type="password" placeholder="password" value={form.password || ""} onChange={onChange} /><br/>
      <input name="firstName" placeholder="First Name" value={form.firstName || ""} onChange={onChange} /><br/>
      <input name="lastName" placeholder="Last Name" value={form.lastName || ""} onChange={onChange} /><br/>
      <input name="email" type="email" placeholder="email" value={form.email || ""} onChange={onChange} /><br/>
      <select name="role" value={form.role || ""} onChange={onChange}>
        <option value="student">Student</option>
        <option value="faculty">Faculty</option>
        <option value="admin">Admin</option>
      </select><br/>
      <button onClick={save}>Save</button>
      <button onClick={logout} style={{ marginLeft: 8 }}>Sign out</button>
    </div>
  );
}
