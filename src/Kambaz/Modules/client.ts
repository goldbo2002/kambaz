const BASE = "http://localhost:4000/api";
const j = (r: Response) => { if (!r.ok) throw new Error(`${r.status} ${r.statusText}`); return r.json(); };

export const listModules = (cid: string) =>
  fetch(`${BASE}/modules/course/${cid}`, { credentials: "include" }).then(j);

export const createModule = (cid: string, m: any) =>
  fetch(`${BASE}/modules`, {
    method: "POST", credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...m, course: cid }),
  }).then(j);

export const updateModule = (_cid: string, mid: string, m: any) =>
  fetch(`${BASE}/modules/${mid}`, {
    method: "PUT", credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(m),
  }).then(j);

export const deleteModule = (_cid: string, mid: string) =>
  fetch(`${BASE}/modules/${mid}`, { method: "DELETE", credentials: "include" }).then(j);
