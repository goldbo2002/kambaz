import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [err, setErr] = useState("");

  const load = async () => {
    try {
      const res = await api.get("/users/profile");
      setUser(res.data);
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Not signed in");
    }
  };

  const logout = async () => {
    try {
      await api.post("/users/signout");
      setUser(null);
    } catch (e: any) {
      console.log("Logout failed", e);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (err) return <div className="alert alert-warning">{err}</div>;
  if (!user) return <div>Loading profile...</div>;

  return (
    <div>
      <h3>Welcome, {user.username}</h3>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
      <p><strong>DOB:</strong> {user.dob}</p>
      <button className="btn btn-secondary" onClick={logout}>Logout</button>
    </div>
  );
}
