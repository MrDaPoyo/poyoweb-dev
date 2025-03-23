import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    // Use the user that was already attached in hooks.server.ts
    if (!locals.user) {
        throw redirect(303, '/auth');
    }
    
    return { 
        user: locals.user 
    };
};