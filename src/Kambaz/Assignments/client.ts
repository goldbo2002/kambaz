const BASE = "http://localhost:4000/api";
const j = (r: Response) => { if (!r.ok) throw new Error(`${r.status} ${r.statusText}`); return r.json(); };

export const listAssignments = (cid: string) =>
  fetch(`${BASE}/assignments/course/${cid}`, { credentials: "include" }).then(j);

export const createAssignment = (cid: string, a: any) =>
  fetch(`${BASE}/assignments`, {
    method: "POST", credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...a, course: cid }),
  }).then(j);

export const updateAssignment = (_cid: string, aid: string, a: any) =>
  fetch(`${BASE}/assignments/${aid}`, {
    method: "PUT", credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(a),
  }).then(j);

export const deleteAssignment = (_cid: string, aid: string) =>
  fetch(`${BASE}/assignments/${aid}`, { method: "DELETE", credentials: "include" }).then(j);
