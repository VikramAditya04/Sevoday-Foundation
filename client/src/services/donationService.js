import { apiRequest } from "./api";

export function getAdminDonations() {
	return apiRequest("/donations/admin");
}

export function createDonationOrder(values) {
	return apiRequest("/donations/orders", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(values),
	});
}

export function verifyDonationPayment(values) {
	return apiRequest("/donations/verify", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(values),
	});
}

export function failDonationPayment(donationId) {
	return apiRequest("/donations/fail", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ donationId }),
	});
}
