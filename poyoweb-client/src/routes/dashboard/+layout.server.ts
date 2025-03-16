import { requireAuth } from '../../lib/auth';

export const load = async ({ cookies }) => {
    const authToken = requireAuth(cookies);
    return { user: authToken };
};