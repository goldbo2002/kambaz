const BASE = "http://localhost:4000/api";
const j = (r: Response) => { if (!r.ok) throw new Error(`${r.status} ${r.statusText}`); return r.json(); };

export const findAllCourses = () =>
  fetch(`${BASE}/courses`, { credentials: "include" }).then(j);
export const findCourseById = (cid: string) =>
  fetch(`${BASE}/courses/${cid}`, { credentials: "include" }).then(j);
export const createCourse = (c: any) =>
  fetch(`${BASE}/courses`, {
    method: "POST", credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(c),
  }).then(j);
export const updateCourse = (cid: string, c: any) =>
  fetch(`${BASE}/courses/${cid}`, {
    method: "PUT", credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(c),
  }).then(j);
export const deleteCourse = (cid: string) =>
  fetch(`${BASE}/courses/${cid}`, { method: "DELETE", credentials: "include" }).then(j);

// people in course
export const listCoursePeople = (cid: string) =>
  fetch(`${BASE}/courses/${cid}/users`, { credentials: "include" }).then(j);

// auth + enrollments
export const currentUser = () =>
  fetch(`${BASE}/users/current`, { credentials: "include" }).then(j);
export const listMyCourses = () =>
  fetch(`${BASE}/enrollments/me`, { credentials: "include" }).then(j);
export const enroll = (uid: string, cid: string) =>
  fetch(`${BASE}/enrollments/${uid}/courses/${cid}`, { method: "POST", credentials: "include" }).then(j);
export const unenroll = (uid: string, cid: string) =>
  fetch(`${BASE}/enrollments/${uid}/courses/${cid}`, { method: "DELETE", credentials: "include" }).then(j);
