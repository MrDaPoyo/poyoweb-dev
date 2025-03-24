type DecodedUser = { 
    id: number;
    name: string;
    email: string;
    tier: string; 
};

export async function requireAuth(cookies: any): Promise<DecodedUser | null> {
    const authToken = await cookies.get('auth_token');
    if (!await authToken) return null;

    const response = await fetch('http://localhost:3000/auth/verifyJwt', {
        method: 'POST',
        body: JSON.stringify({ jwt_token: await authToken }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) return null;

    const data = await response.json();

    if (!data.success || !data.decoded) return null;

    return data.decoded as DecodedUser;
}
