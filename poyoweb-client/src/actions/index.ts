// src/lib/authActions.ts
export interface AuthResponse {
	success: boolean;
	jwt_token?: string;
	error?: string;
}

export async function login(
	email: string,
	password: string
): Promise<AuthResponse> {
	try {
		const response = await fetch("http://localhost:3000/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});
		return await response.json();
	} catch (error) {
		return { success: false, error: "Network error" };
	}
}

export async function register(
	email: string,
	password: string,
	username: string
): Promise<AuthResponse> {
	try {
		const response = await fetch("http://localhost:3000/auth/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password, name: username }),
		});
		return await response.json();
	} catch (error) {
		return { success: false, error: "Network error" };
	}
}

export async function logout(jwtToken: string): Promise<AuthResponse> {
	try {
		const response = await fetch("http://localhost:3000/auth/logout", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ jwt_token: jwtToken }),
		});
		return await response.json();
	} catch (error) {
		return { success: false, error: "Network error" };
	}
}
