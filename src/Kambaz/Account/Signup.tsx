import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "./client"; // named export from your client
// NOTE: keep your UI/layout as-is; this is the minimal behavior fix

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "STUDENT",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signup(form);                // 201, sets cookie on backend
      navigate("/Kambaz/Dashboard");     // go to your home/dashboard
      // Minimal doc-scope way to pick up the new session in UI:
      setTimeout(() => window.location.reload(), 0);
    } catch (err: any) {
      if (err?.response?.status === 409) setError("Username already exists.");
      else setError("Sign up failed. Please try again.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="p-3 grid gap-2">
      <h2>Sign Up</h2>
      {error && <div style={{ color: "crimson" }}>{error}</div>}
      <input name="username" placeholder="username" value={form.username} onChange={onChange} />
      <input name="password" type="password" placeholder="password" value={form.password} onChange={onChange} />
      <select name="role" value={form.role} onChange={onChange}>
        <option value="STUDENT">STUDENT</option>
        <option value="INSTRUCTOR">INSTRUCTOR</option>
      </select>
      <input name="firstName" placeholder="first name" value={form.firstName} onChange={onChange} />
      <input name="lastName" placeholder="last name" value={form.lastName} onChange={onChange} />
      <input name="email" placeholder="email" value={form.email} onChange={onChange} />
      <button type="submit">Create Account</button>
    </form>
  );
}
