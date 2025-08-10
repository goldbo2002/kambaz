import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "./client";

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

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signup(form);
      navigate("/Kambaz/Dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={{ maxWidth: 520 }}>
      <h3>Sign up</h3>
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-md-6 mb-2">
            <label className="form-label">Username</label>
            <input className="form-control" value={form.username}
                   onChange={(e) => update("username", e.target.value)} />
          </div>
          <div className="col-md-6 mb-2">
            <label className="form-label">Password</label>
            <input className="form-control" type="password" value={form.password}
                   onChange={(e) => update("password", e.target.value)} />
          </div>
          <div className="col-md-6 mb-2">
            <label className="form-label">First name</label>
            <input className="form-control" value={form.firstName}
                   onChange={(e) => update("firstName", e.target.value)} />
          </div>
          <div className="col-md-6 mb-2">
            <label className="form-label">Last name</label>
            <input className="form-control" value={form.lastName}
                   onChange={(e) => update("lastName", e.target.value)} />
          </div>
          <div className="col-md-6 mb-2">
            <label className="form-label">Email</label>
            <input className="form-control" value={form.email}
                   onChange={(e) => update("email", e.target.value)} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Role</label>
            <select className="form-select" value={form.role}
                    onChange={(e) => update("role", e.target.value)}>
              <option>STUDENT</option>
              <option>FACULTY</option>
              <option>ADMIN</option>
            </select>
          </div>
        </div>
        <button className="btn btn-primary" type="submit">Create account</button>
        <Link to="/Kambaz/Account/Signin" style={{ marginLeft: 8 }}>Sign in</Link>
      </form>
    </div>
  );
}
