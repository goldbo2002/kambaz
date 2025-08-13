import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ChangeEvent, FormEvent } from "react";
import { AxiosError } from "axios";
import { api } from "../../lib/api";

type SigninForm = {
  username?: string;
  email?: string;
  password: string;
};

export default function Signin() {
  const navigate = useNavigate();
  const [form, setForm] = useState<SigninForm>({ username: "", email: "", password: "" });
  const [error, setError] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const payload: SigninForm = { password: form.password };
      if (form.email) payload.email = form.email;
      else payload.username = form.username;
      await api.post("/users/signin", payload);
      navigate("/Kambaz/Dashboard");
    } catch (err: unknown) {
      const ax = err as AxiosError<{ message?: string }>;
      setError(ax.response?.data?.message || ax.message || "Signin failed");
    }
  };

  return (
    <div className="container my-4">
      <h2>Sign In</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={onSubmit} style={{ maxWidth: 480 }}>
        <div className="mb-2">
          <label className="form-label" htmlFor="username">Username</label>
          <input id="username" name="username" className="form-control"
                 value={form.username || ""} onChange={onChange} type="text" />
          <small className="text-muted">Or use email below</small>
        </div>

        <div className="mb-2">
          <label className="form-label" htmlFor="email">Email</label>
          <input id="email" name="email" className="form-control"
                 value={form.email || ""} onChange={onChange} type="email" />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="password">Password</label>
          <input id="password" name="password" className="form-control"
                 value={form.password} onChange={onChange} type="password" required />
        </div>

        <button className="btn btn-primary" type="submit">Sign In</button>
      </form>
    </div>
  );
}
