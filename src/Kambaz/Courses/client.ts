import { api } from "./api";

export const findAllCourses = () => api.get("/courses").then(r => r.data);
export const createCourse = (course: any) => api.post("/courses", course).then(r => r.data);
export const updateCourse = (cid: string, course: any) => api.put(`/courses/${cid}`, course).then(r => r.data);
export const deleteCourse = (cid: string) => api.delete(`/courses/${cid}`).then(r => r.data);

export const myCourses = () => api.get("/enrollments/me").then(r => r.data);
export const enroll = (uid: string, cid: string) => api.post(`/enrollments/${uid}/courses/${cid}`).then(r => r.data);
export const unenroll = (uid: string, cid: string) => api.delete(`/enrollments/${uid}/courses/${cid}`).then(r => r.data);

export const courseUsers = (cid: string) => api.get(`/courses/${cid}/users`).then(r => r.data);
