import type { Actions } from './$types';

export const actions = {
    login: async ({ request }) => {
        const formData = await request.formData();
        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        try {
            const response = await fetch('http://localhost:3000/auth/login/', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                return { loginSuccess: true };
            } else {
                return { loginSuccess: false, incorrect: true };
            }
        } catch (error) {
            console.error(error);
            return { loginSuccess: false, incorrect: true };
        }
    },

    register: async ({ request }) => {
        const formData = await request.formData();
        const data = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password')
        };

        try {
            const response = await fetch('http://localhost:3000/auth/register/', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                return { registerSuccess: true };
            } else {
                const errorData = await response.json();
                return { registerSuccess: false, registerError: errorData.message || "Unknown error" };
            }
        } catch (error) {
            console.error(error);
            return { registerSuccess: false, registerError: JSON.stringify(error) };
        }
    }
} satisfies Actions;
