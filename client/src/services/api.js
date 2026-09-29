const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export async function apiRequest(path, options = {}) {
	try {
		const response = await fetch(`${API_URL}${path}`, { credentials: 'include', ...options });
		const data = await response.json().catch(() => ({}));
		if (!response.ok) throw new Error(data.message || 'Something went wrong.');
		return data;
	} catch (error) {
		if (error instanceof TypeError) {
			throw new Error('Unable to connect to the backend. Please start the server and try again.', { cause: error });
		}
		throw error;
	}
}
