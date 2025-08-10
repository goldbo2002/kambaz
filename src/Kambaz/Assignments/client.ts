import { api } from "./api";

export const listAssignments = (cid: string) => api.get(`/assignments/course/${cid}`).then(r => r.data);
export const createAssignment = (doc: any) => api.post("/assignments", doc).then(r => r.data);
export const updateAssignment = (aid: string, doc: any) => api.put(`/assignments/${aid}`, doc).then(r => r.data);
export const deleteAssignment = (aid: string) => api.delete(`/assignments/${aid}`).then(r => r.data);
