import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
    if (!locals.user) {
        throw new Response(null, { status: 302, headers: { Location: '/auth' } });
    }

    return { user: locals.user };
};