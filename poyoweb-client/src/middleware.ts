import { defineMiddleware } from 'astro:middleware';

const authenticated_routes = [
    '/dashboard',
    '/settings',
    '/profile',
    '/editor',
];    

interface SessionUserData {
    user_id: number;
}

interface ApiResponse {
    success: boolean;
    decoded?: SessionUserData;
}

declare module 'astro' {
    namespace App {
        interface Locals {
            session?: {
                user: SessionUserData;
            };
        }
    }
}


export const onRequest = defineMiddleware(async (context, next) => {
    const sessionCookie = context.cookies.get('auth_session');

    context.locals.session = undefined;

    if (sessionCookie?.value) {
        try {
            const apiUrl = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000';
            const verifyUrl = `${apiUrl}/auth/verifyJwt/`;

            const response = await fetch(verifyUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ jwt_token: sessionCookie.value }),
            });

            if (response.ok) {
                const data: ApiResponse = await response.json();
                if (data.success && data.decoded) {
                    context.locals.session = { user: data.decoded };
                } else {
                    context.cookies.delete('auth_session', { path: '/' });
                }
            } else {
                console.error(`API Error (${response.status}): Failed to verify JWT.`);
                context.cookies.delete('auth_session', { path: '/' });
            }
        } catch (error) {
            console.error('Middleware Error: Failed to fetch API for JWT verification.', error);
            context.cookies.delete('auth_session', { path: '/' });
        }
    }

    if (authenticated_routes.some(route => context.url.pathname.startsWith(route))) {
        if (!context.locals.session) {
            return context.redirect('/auth', 302);
        }
    }

    return next();
});