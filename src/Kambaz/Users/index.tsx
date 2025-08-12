import { useEffect, useMemo, useState } from "react";
import {
  createUser, deleteUser, findAllUsers, findUsersByRole,
  searchUsersByName, updateUser, type User, type Role
} from "./client";

const cell = { border: "1px solid #ddd", padding: "6px 8px" };

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [role, setRole] = useState<Role | "">("");
  const [nameQ, setNameQ] = useState("");
  const [selected, setSelected] = useState<User | null>(null);
  const [draft, setDraft] = useState<User | null>(null);
  const [newDraft, setNewDraft] = useState<Partial<User>>({ username: "new_user", role: "user" });

  const load = async () => setUsers(await findAllUsers());
  useEffect(() => { load(); }, []);

  const applyRole = async (r: Role | "") => {
    setRole(r);
    if (!r) return load();
    setUsers(await findUsersByRole(r));
  };
  const applyName = async (q: string) => {
    setNameQ(q);
    if (!q.trim()) return load();
    setUsers(await searchUsersByName(q.trim()));
  };

  const addUser = async () => {
    const created = await createUser({
      username: newDraft.username || `user_${Date.now()}`,
      password: newDraft.password || "test123",
      firstName: newDraft.firstName || "New",
      lastName: newDraft.lastName || "User",
      role: (newDraft.role as Role) || "user",
      email: newDraft.email || "new@user.com",
    });
    setUsers((u) => [created, ...u]);
    setNewDraft({ username: "new_user", role: "user" });
  };

  const select = (u: User) => { setSelected(u); setDraft({ ...u }); };

  const save = async () => {
    if (!draft || !draft._id) return;
    const updated = await updateUser(draft);
    setUsers((u) => u.map((x) => (x._id === updated._id ? updated : x)));
    setSelected(updated);
    setDraft(updated);
  };

  const remove = async (id?: string) => {
    if (!id) return;
    setUsers((u) => u.filter((x) => x._id !== id));
    try { await deleteUser(id); } catch {}
    if (selected?._id === id) { setSelected(null); setDraft(null); }
  };

  const roles: Role[] = ["student", "faculty", "admin", "user"];
  const count = useMemo(() => users.length, [users]);

  return (
    <div style={{ maxWidth: 1100, margin: "24px auto" }}>
      <h2>Users</h2>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        <select value={role} onChange={(e) => applyRole(e.target.value as Role | "")}>
          <option value="">All roles</option>
          {roles.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <input
          placeholder="Search by name"
          value={nameQ}
          onChange={(e) => applyName(e.target.value)}
          style={{ width: 220 }}
        />
        <div style={{ opacity: .7 }}>Total: {count}</div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed", marginBottom: 12 }}>
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col style={{ width: "120px" }} />
        </colgroup>
        <thead>
          <tr>
            <th style={cell}>Username</th>
            <th style={cell}>Name</th>
            <th style={cell}>Role</th>
            <th style={cell}>Email</th>
            <th style={cell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td style={cell}>
                <button style={{ all:"unset", color:"#0d6efd", cursor:"pointer" }} onClick={() => select(u)}>
                  {u.username}
                </button>
              </td>
              <td style={cell}>{[u.firstName, u.lastName].filter(Boolean).join(" ")}</td>
              <td style={cell}>{u.role}</td>
              <td style={cell}>{u.email}</td>
              <td style={cell}>
                <button onClick={() => select(u)}>Edit</button>{" "}
                <button onClick={() => remove(u._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 20 }}>
        <b>+People</b>
        <input placeholder="username" value={newDraft.username||""}
               onChange={(e)=>setNewDraft(d=>({...d, username:e.target.value}))}/>
        <input placeholder="email" value={newDraft.email||""}
               onChange={(e)=>setNewDraft(d=>({...d, email:e.target.value}))}/>
        <select value={(newDraft.role as string) || "user"}
                onChange={(e)=>setNewDraft(d=>({...d, role:e.target.value as Role}))}>
          {roles.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <button onClick={addUser}>Add user</button>
      </div>

      {selected && draft && (
        <div style={{ border:"1px solid #ddd", padding:12 }}>
          <h4>PeopleDetails</h4>
          <div style={{ display:"grid", gridTemplateColumns:"160px 1fr", gap:8 }}>
            <label>Username</label>
            <input value={draft.username} onChange={(e)=>setDraft({...draft, username:e.target.value})}/>
            <label>First name</label>
            <input value={draft.firstName||""} onChange={(e)=>setDraft({...draft, firstName:e.target.value})}/>
            <label>Last name</label>
            <input value={draft.lastName||""} onChange={(e)=>setDraft({...draft, lastName:e.target.value})}/>
            <label>Email</label>
            <input value={draft.email||""} onChange={(e)=>setDraft({...draft, email:e.target.value})}/>
            <label>Role</label>
            <select value={draft.role||"user"} onChange={(e)=>setDraft({...draft, role:e.target.value as Role})}>
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div style={{ marginTop:12, display:"flex", gap:8 }}>
            <button onClick={save}>Save</button>
            <button onClick={()=>remove(draft._id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}
