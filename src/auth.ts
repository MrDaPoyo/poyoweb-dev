import { Elysia } from 'elysia';
import { db } from './db';  // This is already correct
import { usersTable } from './db/schema';

interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
}

export class AuthModule {
    constructor() { }

    public setup(app: Elysia) {
        return app.group('/auth', (app) =>
            app.post('/register', async ({ body }) => {
                    const { username, email, password } = body as User;

                    try {
                        const result = await db.insert(usersTable).values({
                            username,
                            email,
                            password,
                            tier: 0,
                            created_at: new Date().toISOString()
                        }).run();

                        return {
                            success: true,
                            result: result
                        };
                    } catch (error) {
                        return {
                            success: false,
                            error: 'Username or email already exists'
                        };
                    }
                })
        );
    }
}

// Export instance
export const auth = new AuthModule();
