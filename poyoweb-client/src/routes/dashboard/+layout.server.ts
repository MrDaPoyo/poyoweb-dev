import { redirect } from '@sveltejs/kit';
import { requireAuth } from '../../lib/auth';

export const load = async ({ cookies }) => {
    const authToken = await requireAuth(cookies);
    console.log(authToken)
    if (!authToken) {
        redirect(308, '/auth')
    }
    return { user: authToken };
};