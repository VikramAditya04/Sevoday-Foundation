import { apiRequest } from "./api";

export const getMemberStats = () => apiRequest("/members/stats");
export const getPendingMembers = () => apiRequest("/members/pending");
export const getMember = (id) => apiRequest(`/members/${id}`);
export const approveMember = (id) => apiRequest(`/members/${id}/approve`, { method: "PATCH" });
export const rejectMember = (id) => apiRequest(`/members/${id}/reject`, { method: "PATCH" });