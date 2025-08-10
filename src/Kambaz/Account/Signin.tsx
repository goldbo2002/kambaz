import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "./client";

export default function Signin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signin(form);
      navigate("/Kambaz/Dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div style={{ marginTop: 12, maxWidth: 420 }}>
      <h3>Sign in</h3>
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
      <form onSubmit={onSubmit}>
        <input
          name="username"
          placeholder="username"
          value={form.username}
          onChange={onChange}
          className="form-control mb-2"
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          value={form.password}
          onChange={onChange}
          className="form-control mb-2"
        />
        <button type="submit" id="wd-signin-btn" className="btn btn-primary">
          Sign in
        </button>
        <Link to="/Kambaz/Account/Signup" id="wd-signup-link" style={{ marginLeft: 8 }}>
          Sign up
        </Link>
      </form>
    </div>
  );
}
