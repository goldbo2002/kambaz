import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";

type User = {
  _id: string;
  username: string;
  email: string;
  role?: string;
  firstName?: string;
  lastName?: string;
};

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");

  const loadMe = async () => {
    try {
      const res = await api.get<User>("/users/me");
      setUser(res.data);
    } catch (err: unknown) {
      const ax = err as AxiosError<{ message?: string }>;
      setError(ax.response?.data?.message || ax.message || "Failed to load profile");
    }
  };

  useEffect(() => { loadMe(); }, []);

  const save = async () => {
    try {
      if (!user) return;
      const res = await api.put<User>("/users/me", {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      });
      setUser(res.data);
      setError("");
    } catch (err: unknown) {
      const ax = err as AxiosError<{ message?: string }>;
      setError(ax.response?.data?.message || ax.message || "Update failed");
    }
  };

  const signout = async () => {
    await api.post("/users/signout");
    navigate("/Kambaz/Account/Signin");
  };

  if (!user) return (
    <div className="container my-4">
      <h2>Profile</h2>
      {error ? <div className="alert alert-danger">{error}</div> : <p>Loading…</p>}
    </div>
  );

  return (
    <div className="container my-4" style={{ maxWidth: 600 }}>
      <h2>Profile</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label className="form-label">Username</label>
        <input className="form-control" value={user.username} disabled />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input className="form-control" value={user.email || ""} onChange={(e) => setUser({ ...user, email: e.target.value })} />
      </div>

      <div className="mb-3">
        <label className="form-label">First Name</label>
        <input className="form-control" value={user.firstName || ""} onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
      </div>

      <div className="mb-3">
        <label className="form-label">Last Name</label>
        <input className="form-control" value={user.lastName || ""} onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
      </div>

      <div className="mb-3">
        <label className="form-label">Role</label>
        <input className="form-control" value={user.role || ""} onChange={(e) => setUser({ ...user, role: e.target.value })} />
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-success" onClick={save}>Save</button>
        <button className="btn btn-outline-secondary" onClick={() => loadMe()}>Reload</button>
        <button className="btn btn-danger ms-auto" onClick={signout}>Sign Out</button>
      </div>
    </div>
  );
}
