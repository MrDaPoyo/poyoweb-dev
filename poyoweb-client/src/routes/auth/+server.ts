import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
    try {
        const { mode, email, password, name } = await request.json();
        const action = mode || 'login';
        
        let endpoint;
        let body;
        
        if (action === 'register') {
            endpoint = 'http://localhost:3000/auth/register';
            body = JSON.stringify({ email, password, name });
        } else {
            endpoint = 'http://localhost:3000/auth/login';
            body = JSON.stringify({ email, password });
        }

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body
        });

        if (!response.ok) {
            const errorData = await response.json();
            return json({ error: errorData.message || 'Authentication failed' }, { status: response.status });
        }

        const data = await response.json();
        
        if (!data.success && action === 'login') {
            return json({ error: 'Invalid credentials' }, { status: 401 });
        }

        if (action === 'login' && data.jwt_token) {
            cookies.set('auth_token', data.jwt_token, {
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7 // 1 week
            });
        }

        return json({ success: true });
    } catch (error) {
        console.error(error);
        return json({ error: 'Server error' }, { status: 500 });
    }
}
