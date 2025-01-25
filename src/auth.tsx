import { Elysia } from 'elysia';
import { db } from './db';
import { usersTable } from './db/schema';
import { Html } from '@elysiajs/html';
import { hash, compare } from "bun"

import BaseHtml from './components/base';
import AuthHtml from './components/auth';

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
            app.get('/', async () => {
                console.log('Auth module');
                    return (
                    <BaseHtml>
                       {await <AuthHtml />}
                    </BaseHtml>
                    );
                })
                .post('/register', async ({ body }) => {
                    const { username, email, password } = body as User;
                    try {
                        const hashedPassword = await hash(password, 10);
                        const result = await db.insert(usersTable).values({
                            username,
                            email,
                            password: hashedPassword,
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
                .post('/login', async ({ body }) => {
                    const { email, password } = body as User;
                    const result = await db.select().from(usersTable).where({ email, password });
                    if (result.length === 0) {
                        return {
                            success: false,
                            error: 'Invalid email or password'
                        };
                    }
                    return {
                        success: true,
                        result: result
                    };
                })
        );
    }
}


export const auth = new AuthModule();