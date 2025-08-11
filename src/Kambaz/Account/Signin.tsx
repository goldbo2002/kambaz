import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "./client"; // named export from your client

export default function Signin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signin(form);                // 200, sets cookie
      navigate("/Kambaz/Dashboard");
      // Minimal doc-scope way to pick up the session in UI:
      setTimeout(() => window.location.reload(), 0);
    } catch {
      setError("Invalid username or password.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="p-3 grid gap-2">
      <h2>Sign In</h2>
      {error && <div style={{ color: "crimson" }}>{error}</div>}
      <input name="username" placeholder="username" value={form.username} onChange={onChange} />
      <input name="password" type="password" placeholder="password" value={form.password} onChange={onChange} />
      <button type="submit">Sign In</button>
    </form>
  );
}
