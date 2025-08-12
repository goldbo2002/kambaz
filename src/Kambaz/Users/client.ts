const BASE = "http://localhost:4000/api";

export type Role = "student" | "faculty" | "admin" | "user";
export type User = {
  _id?: string;
  username: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
  email?: string;
};

const toJson = (r: Response) => {
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.json();
};

export const findAllUsers = () =>
  fetch(`${BASE}/users`, { credentials: "include" }).then(toJson);

export const createUser = (u: Partial<User>) =>
  fetch(`${BASE}/users`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(u),
  }).then(toJson);

export const deleteUser = (id: string) =>
  fetch(`${BASE}/users/${id}`, {
    method: "DELETE",
    credentials: "include",
  }).then(toJson);

export const updateUser = (u: User) =>
  fetch(`${BASE}/users/${u._id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(u),
  }).then(toJson);

export const findUsersByRole = (role: Role) =>
  fetch(`${BASE}/users?role=${role}`, { credentials: "include" }).then(toJson);

export const searchUsersByName = (q: string) =>
  fetch(`${BASE}/users?name=${encodeURIComponent(q)}`, {
    credentials: "include",
  }).then(toJson);
