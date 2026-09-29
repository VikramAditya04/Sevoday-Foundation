import { apiRequest } from "./api";

export function getPublicContent(type) {
	return apiRequest(`/content/public/${type}`);
}

export function getPublicContentBySlug(type, slug) {
	return apiRequest(`/content/public/${type}/${encodeURIComponent(slug)}`);
}

export function getAdminContent(type) {
	return apiRequest(`/content/admin/${type}`);
}

function toFormData(values, type, imageFile) {
	const formData = new FormData();
	Object.entries(values).forEach(([key, value]) => formData.append(key, String(value ?? "")));
	formData.set("type", String(type || "").toUpperCase());
	if (imageFile) formData.append("image", imageFile);
	return formData;
}

export function createContent(type, values, imageFile) {
	return apiRequest("/content", { method: "POST", body: toFormData(values, type, imageFile) });
}

export function updateContent(id, type, values, imageFile) {
	return apiRequest(`/content/${id}`, { method: "PATCH", body: toFormData(values, type, imageFile) });
}

export function deleteContent(id) {
	return apiRequest(`/content/${id}`, { method: "DELETE" });
}
