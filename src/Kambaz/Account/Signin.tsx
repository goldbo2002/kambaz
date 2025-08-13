import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../lib/api";

export default function Signin() {
  const nav = useNavigate();
  const [form, setForm] = useState({ username: "iron_man", password: "stark123" });
  const [err, setErr] = useState("");

  const set = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/users/signin", form);
      nav("/Kambaz/Account/Profile");
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Signin failed");
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 420 }}>
      <h3>Signin</h3>
      {err && <div className="alert alert-danger">{err}</div>}
      <div className="mb-2">
        <label className="form-label">Username (text)</label>
        <input className="form-control" value={form.username} onChange={set("username")} />
      </div>
      <div className="mb-3">
        <label className="form-label">Password (password)</label>
        <input className="form-control" type="password" value={form.password} onChange={set("password")} />
      </div>
      <button className="btn btn-primary" type="submit">Signin</button>
      <Link className="btn btn-link" to="/Kambaz/Account/Signup">Signup</Link>
    </form>
  );
}
