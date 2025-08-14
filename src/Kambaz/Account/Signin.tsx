import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SERVER = "https://kambaz.onrender.com";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${SERVER}/api/users/signin`,
        { username, password },
        { withCredentials: true }
      );
      if (response.data) {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Signin failed.");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 400 }}>
      <h2 className="mb-3">Sign In</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSignin}>
        <div className="form-group mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary w-100">Sign In</button>
      </form>
    </div>
  );
}
