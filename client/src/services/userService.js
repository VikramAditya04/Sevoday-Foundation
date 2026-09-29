import { apiRequest } from "./api";

export function updateProfile(values) {
	const formData = new FormData();
	formData.append("fullName", values.fullName);
	formData.append("email", values.email);
	if (values.profilePhoto) formData.append("profilePhoto", values.profilePhoto);

	return apiRequest("/auth/profile", {
		method: "PATCH",
		body: formData,
	});
}
