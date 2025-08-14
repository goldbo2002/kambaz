import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../lib/api";

export default function Signin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/users/signin", { email, password });
      nav("/Kambaz/Dashboard");
    } catch (err: unknown) {
      const msg =
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof (err as any).response?.data === "string"
          ? (err as any).response.data
          : "Signin failed";
      setErr(msg);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2>Sign In</h2>
      <form onSubmit={handleSignin}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {err && <div className="alert alert-danger">{err}</div>}

        <button className="btn btn-primary w-100">Sign In</button>
      </form>

      <p className="mt-3 text-center">
        Don’t have an account? <Link to="/Kambaz/Signup">Sign up here</Link>
      </p>
    </div>
  );
}
