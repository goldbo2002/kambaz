import { api } from "./api";

export const listModules = (cid: string) => api.get(`/modules/course/${cid}`).then(r => r.data);
export const createModule = (doc: any) => api.post("/modules", doc).then(r => r.data);
export const updateModule = (mid: string, doc: any) => api.put(`/modules/${mid}`, doc).then(r => r.data);
export const deleteModule = (mid: string) => api.delete(`/modules/${mid}`).then(r => r.data);
