import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";

export default function Profile() {
  const nav = useNavigate();
  const [me, setMe] = useState<any>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    api.get("/users/current").then(
      (r) => setMe(r.data),
      () => nav("/Kambaz/Account/Signin")
    );
  }, [nav]);

  if (!me) return <div>Loading…</div>;
  const set = (k: string) => (e: any) => setMe((f: any) => ({ ...f, [k]: e.target.value }));

  const save = async () => {
    try { await api.put(`/users/${me._id}`, me); alert("Saved"); }
    catch (e: any) { setErr(e?.response?.data?.message || "Save failed"); }
  };
  const signout = async () => { await api.post("/users/signout"); nav("/Kambaz/Account/Signin"); };

  return (
    <div style={{ maxWidth: 560 }}>
      <h3>Profile</h3>
      {err && <div className="alert alert-danger">{err}</div>}
      <div className="mb-2"><label className="form-label">Username</label>
        <input className="form-control" value={me.username||""} onChange={set("username")} /></div>
      <div className="mb-2"><label className="form-label">First name</label>
        <input className="form-control" value={me.firstName||""} onChange={set("firstName")} /></div>
      <div className="mb-2"><label className="form-label">Last name</label>
        <input className="form-control" value={me.lastName||""} onChange={set("lastName")} /></div>
      <div className="mb-2"><label className="form-label">DOB</label>
        <input className="form-control" type="date" value={(me.dob||"").slice(0,10)} onChange={set("dob")} /></div>
      <div className="mb-3"><label className="form-label">Email</label>
        <input className="form-control" type="email" value={me.email||""} onChange={set("email")} /></div>
      <button className="btn btn-primary me-2" onClick={save}>Save</button>
      <button className="btn btn-outline-secondary" onClick={signout}>Signout</button>
    </div>
  );
}
