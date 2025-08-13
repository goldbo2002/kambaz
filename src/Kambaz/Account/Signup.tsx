import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../lib/api";

export default function Signup() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    username: "iron_man",
    password: "stark123",
    firstName: "Tony",
    lastName: "Stark",
    email: "tony@avengers.org",
    role: "STUDENT",
    dob: "1970-05-29"
  });
  const [err, setErr] = useState("");

  const set = (k: string) => (e: any) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/users/signup", form);
      nav("/Kambaz/Account/Profile");
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 520 }}>
      <h3>Signup</h3>
      {err && <div className="alert alert-danger">{err}</div>}
      <div className="mb-2"><label className="form-label">Username</label>
        <input className="form-control" value={form.username} onChange={set("username")} /></div>
      <div className="mb-2"><label className="form-label">Password</label>
        <input className="form-control" type="password" value={form.password} onChange={set("password")} /></div>
      <div className="mb-2"><label className="form-label">Verify Password</label>
        <input className="form-control" type="password" defaultValue={form.password} /></div>
      <div className="mb-2"><label className="form-label">First Name</label>
        <input className="form-control" value={form.firstName} onChange={set("firstName")} /></div>
      <div className="mb-2"><label className="form-label">Last Name</label>
        <input className="form-control" value={form.lastName} onChange={set("lastName")} /></div>
      <div className="mb-2"><label className="form-label">Email</label>
        <input className="form-control" type="email" value={form.email} onChange={set("email")} /></div>
      <div className="mb-2"><label className="form-label">Role (4 options)</label>
        <select className="form-select" value={form.role} onChange={set("role")}>
          <option value="STUDENT">STUDENT</option>
          <option value="FACULTY">FACULTY</option>
          <option value="ADMIN">ADMIN</option>
          <option value="TA">TA</option>
        </select>
      </div>
      <div className="mb-3"><label className="form-label">DOB (date)</label>
        <input className="form-control" type="date" value={form.dob} onChange={set("dob")} /></div>
      <button className="btn btn-success" type="submit">Signup</button>
      <Link className="btn btn-link" to="/Kambaz/Account/Signin">Signin</Link>
    </form>
  );
}
