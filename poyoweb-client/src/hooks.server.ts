import type { Handle } from '@sveltejs/kit';
import { requireAuth } from '$lib/auth';

export const handle: Handle = async ({ event, resolve }) => {
    const user = await requireAuth(event.cookies);
    event.locals.user = user;
    return resolve(event);
};