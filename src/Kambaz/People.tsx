import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import {
  findAllUsers, createUser, updateUser, deleteUser
} from "./Account/client";

type Role = "STUDENT" | "FACULTY" | "ADMIN";
type User = {
  _id?: string;
  username: string;
  password?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
};

export default function People() {
  const [users, setUsers] = useState<User[]>([]);
  const [role, setRole] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => { load(); }, []);

  const load = async () => setUsers(await findAllUsers());

  const filterByRole = async (r: string) => {
    setRole(r);
    if (!r) return load();
    setUsers(await findAllUsers({ role: r }));
  };

  const filterByName = async (n: string) => {
    setName(n);
    if (!n) return load();
    setUsers(await findAllUsers({ name: n }));
  };

  const onCreate = async () => {
    const username = prompt("New username?");
    if (!username) return;
    const created = await createUser({
      username, password: "test1234", role: "STUDENT"
    });
    setUsers(prev => [created, ...prev]);
  };

  const onUpdate = async (u: User, field: keyof User, value: string) => {
    if (!u._id) return;
    const saved = await updateUser(u._id, { [field]: value });
    setUsers(prev => prev.map(x => x._id === saved._id ? saved : x));
  };

  const onDelete = async (u: User) => {
    if (!u._id) return;
    setUsers(prev => prev.filter(x => x._id !== u._id)); // optimistic
    await deleteUser(u._id);
  };

  const onTxt = (u: User, field: keyof User) =>
    (e: ChangeEvent<HTMLInputElement>) => onUpdate(u, field, e.target.value);

  const onRole = (u: User) =>
    (e: ChangeEvent<HTMLSelectElement>) => onUpdate(u, "role", e.target.value);

  return (
    <div>
      <h3>Users</h3>

      <div className="d-flex gap-2 mb-3">
        <select className="form-select" style={{ maxWidth: 200 }}
                value={role} onChange={e => filterByRole(e.target.value)}>
          <option value="">All roles</option>
          <option value="STUDENT">Student</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Admin</option>
        </select>

        <input className="form-control" style={{ maxWidth: 260 }}
               placeholder="Filter by name"
               value={name} onChange={e => filterByName(e.target.value)} />

        <button className="btn btn-success" onClick={onCreate}>+ People</button>
      </div>

      <table className="table align-middle">
        <thead>
          <tr>
            <th style={{ width: 180 }}>Username</th>
            <th style={{ width: 140 }}>First</th>
            <th style={{ width: 140 }}>Last</th>
            <th style={{ width: 220 }}>Email</th>
            <th style={{ width: 140 }}>Role</th>
            <th style={{ width: 100 }} />
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td><input className="form-control" value={u.firstName || ""} onChange={onTxt(u,"firstName")} /></td>
              <td><input className="form-control" value={u.lastName || ""}  onChange={onTxt(u,"lastName")} /></td>
              <td><input className="form-control" value={u.email || ""}     onChange={onTxt(u,"email")} /></td>
              <td>
                <select className="form-select" value={u.role || "STUDENT"} onChange={onRole(u)}>
                  <option>STUDENT</option><option>FACULTY</option><option>ADMIN</option>
                </select>
              </td>
              <td>
                <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(u)}>Delete</button>
              </td>
            </tr>
          ))}
          {!users.length && (
            <tr>
              <td colSpan={6} className="text-secondary">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
