import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    let token: string | null = null;

    if (event.cookies) {
        token = event.cookies.get('jwt') || null;
    } else if (typeof window !== 'undefined') {
        token = localStorage.getItem('jwt');
    }

    if (token) {
        try {
            const verifyResponse = await event.fetch(`http://localhost:3000/auth/verifyJwt/${token}`);
            if (verifyResponse.status !== 200) throw new Error('Unauthorized');
        } catch {
            if (event.cookies) {
                event.cookies.delete('jwt'); // Remove expired token
            } else if (typeof window !== 'undefined') {
                localStorage.removeItem('jwt');
            }
            throw redirect(302, '/auth');
        }
    }

    return resolve(event);
};
