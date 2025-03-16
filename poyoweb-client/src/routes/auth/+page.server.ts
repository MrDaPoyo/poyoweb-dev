import type { Actions } from './$types';

export const actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const data = {
			email: formData.get('email'),
			password: formData.get('password')
		};

		try {
			const response = await fetch('http://localhost:3000/auth/login', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (response.ok) {
				const jwtToken = (await response.json()).jwt_token;
				cookies.set('auth_token', jwtToken, { path: '/' });
				return { loginSuccess: true, jwtToken: jwtToken, redirect: '/dashboard' };
			} else {
				return { loginSuccess: false, incorrect: true };
			}
		} catch (error) {
			console.error(error);
			return { loginSuccess: false, incorrect: true };
		}
	},
	register: async ({ request, cookies }) => {
		try {
			const formData = await request.formData();
			const data = {
				username: formData.get('username'),
				email: formData.get('email'),
				password: formData.get('password')
			};

			const response = await fetch('http://localhost:3000/auth/register', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			console.log(await response.json());
			if (response.ok) {
				const jwtToken = (await response.json()).jwt_token;
				cookies.set('auth_token', jwtToken, { path: '/' });
				return { registerSuccess: true, jwtToken: jwtToken };
			} else {
				const errorData = await response.json();
				console.log(errorData);
				return {
					registerSuccess: false,
					registerError: JSON.stringify(errorData) || 'Unknown error'
				};
			}
		} catch (error) {
			console.log(error);
			return { registerSuccess: false, registerError: JSON.stringify(await error) };
		}
	},
	logout: async ({ cookies }) => {
		cookies.set('auth_token', '', { path: '/' });
		return { logoutSuccess: true, redirect: '/auth' };
	}
} satisfies Actions;
