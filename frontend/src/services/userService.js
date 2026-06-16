import API from "./api";

export const getUsers = () => API.get("/admin/users");
export const getAnalytics = () => API.get("/admin/analytics");
export const getReports = () => API.get("/admin/reports");
export const removeUser = (id) => API.delete(`/admin/users/${id}`);
export const updateUserRole = (id, role) => API.put(`/admin/users/${id}`, { role });