import { apiRequest } from "./api";

export function getPublicProjects() {
	return apiRequest("/projects/public");
}

export function getAdminProjects() {
	return apiRequest("/projects/admin");
}

function toFormData(values, imageFile) {
	const formData = new FormData();
	Object.entries(values).forEach(([key, value]) => formData.append(key, String(value ?? "")));
	if (imageFile) formData.append("image", imageFile);
	return formData;
}

export function createProject(values, imageFile) {
	return apiRequest("/projects", { method: "POST", body: toFormData(values, imageFile) });
}

export function updateProject(id, values, imageFile) {
	return apiRequest(`/projects/${id}`, { method: "PATCH", body: toFormData(values, imageFile) });
}

export function deleteProject(id) {
	return apiRequest(`/projects/${id}`, { method: "DELETE" });
}
