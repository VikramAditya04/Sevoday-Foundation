import { apiRequest } from "../services/api";

let state = { user: null, isLoading: true };
const listeners = new Set();
let initialization;

function emit() {
	listeners.forEach((listener) => listener());
}

export function subscribe(listener) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

export function getAuthSnapshot() {
	return state;
}

export function setAuthUser(user) {
	state = { user, isLoading: false };
	emit();
}

export function updateAuthUser(user) {
	state = { ...state, user };
	emit();
}

export function clearAuthUser() {
	setAuthUser(null);
}

export function initializeAuth() {
	if (initialization) return initialization;
	initialization = apiRequest("/auth/me")
		.then(({ user }) => setAuthUser(user))
		.catch(() => setAuthUser(null));
	return initialization;
}
