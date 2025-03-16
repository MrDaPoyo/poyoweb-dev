type Response = {
    ok: boolean;
    json: () => Promise<{ jwt_token: string, success: boolean }>;
    decoded?: { 
        id: number;
        name: string;
        email: string;
        password: string;
        tier: string; 
    };
};

export async function requireAuth(cookies: any) {
    const authToken = cookies.get('auth_token');
    if (!authToken) {
        throw new Response(null, { status: 302, headers: { Location: '/auth' } });
    }

    const response = await fetch('http://localhost:3000/auth/verifyJwt', {
        method: 'POST',
        body: JSON.stringify({ jwt_token: authToken }),
        headers: {
            'Content-Type': 'application/json'
        }
    }) as Response;
    if (!response.ok) {
        throw new Response(null, { status: 302, headers: { Location: '/auth' } });
    } else if ((await response.json()).success === false) {
        throw new Response(null, { status: 302, headers: { Location: '/auth' } });
    }
    return response.decoded;
}
