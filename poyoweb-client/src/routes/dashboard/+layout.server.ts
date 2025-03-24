import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    // Use the user that was already attached in hooks.server.ts
    const user = locals.user;

    // If the user is not logged in, redirect to the auth page
    
    return { 
        user: user 
    };
};