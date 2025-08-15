import { api } from "@/lib/api";

api.get(`/Account/...`)


export const signin = (credentials: { username: string; password: string }) =>
  api.post("/users/signin", credentials).then(r => r.data);

export const signup = (user: any) =>
  api.post("/users/signup", user).then(r => r.data);

export const signout = () => api.post("/users/signout").then(r => r.data);
export const currentUser = () => api.get("/users/current").then(r => r.data);

export const findAllUsers = (params?: { role?: string; name?: string }) =>
  api.get("/users", { params }).then(r => r.data);

export const createUser = (user: any) => api.post("/users", user).then(r => r.data);
export const updateUser = (id: string, user: any) => api.put(`/users/${id}`, user).then(r => r.data);
export const deleteUser = (id: string) => api.delete(`/users/${id}`).then(r => r.data);
