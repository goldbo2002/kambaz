import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { signin } from "../../redux/authSlice";
import { api } from "@/lib/api";

const Signin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await api.post("/users/signin", { email, password });
    console.log("Signin success:", res.data);
    navigate("/Kambaz/Dashboard");
  } catch (err: any) {
    console.error("Signin failed:", err);
    setError(err.response?.data?.message || "Unknown error");
  }
};


  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ✅ Add this for navigation to Signup */}
      <p style={{ marginTop: "1rem" }}>
        Don't have an account?{" "}
        <a href="/Kambaz/Signup">Sign Up</a>
      </p>
    </div>
  );
};

export default Signin;
