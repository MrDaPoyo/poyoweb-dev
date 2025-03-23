import type { Handle } from '@sveltejs/kit';
import { requireAuth } from '$lib/auth';

export const handle: Handle = async ({ event, resolve }) => {
    const user = await requireAuth(event.cookies);

    // Attach user to locals (available in `layout.server.ts`)
    event.locals.user = await user;

    return resolve(event);
};