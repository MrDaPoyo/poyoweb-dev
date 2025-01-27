import { Elysia, t } from 'elysia';
import { db } from './db';
import { eq } from 'drizzle-orm';
import { usersTable } from './db/schema';
import { Html } from '@elysiajs/html';
import { jwt } from '@elysiajs/jwt'

import BaseHtml from './components/base';
import AuthHtml from './components/auth';

interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
    tier: number;
};

const hashPassword = (password: string): Promise<string> => {
    return Bun.password.hash(password, {
        algorithm: "bcrypt",
    });
};

const comparePassword = (password: string, hash: string): Promise<boolean> => {
    return Bun.password.verify(password, hash);
};

export class AuthModule {
    constructor() { }

    public setup(app: Elysia) {
        return app.group('/auth', (app) =>
            app
                .use(
                    jwt({
                        name: 'jwt',
                        secret: process.env.AUTH_SECRET || 'superdupersecretthatssuperdupersecret1234',
                    })
                ).guard(
                    {
                        async beforeHandle({ set, cookie: { auth }, jwt }) {
                            if (auth) {
                                const user = await jwt.verify(auth.value);
                                if (user) {
                                    set.status = 401;
                                    return { error: "Already logged in." };
                                }
                            }
                            app.state = { user: null } as any;
                        }
                    },
                    (app) =>
                        app
                            .get("/", () => {
                                return <BaseHtml>
                                    <AuthHtml />
                                </BaseHtml>
                            })
                            .post("/register", async ({ set, body, jwt, cookie: { auth }, params }) => {
                                const { username, password, email } = body as User;

                                if (!username || !password || !email) {
                                    set.status = 400;
                                    return { error: "All fields are required." };
                                }
                                var tier = 0;
                                try {
                                    const hashedPassword = await hashPassword(password);
                                    const createdAt = new Date().toISOString();

                                    const result = await db.insert(usersTable).values({
                                        username,
                                        password: hashedPassword,
                                        email,
                                        tier,
                                        created_at: createdAt,
                                    }).run() as any;

                                    const userId = parseInt(result.lastInsertRowid, 10) as number;

                                    auth.set({
                                        value: await jwt.sign({ userId }),
                                        httpOnly: true,
                                        maxAge: 7 * 86400,
                                    })

                                    return { message: "User registered successfully." };
                                } catch (error) {
                                    set.status = 500;
                                    console.warn(error);
                                    return { error: "Error registering user." };
                                }
                            })
                            .post("/login", async ({ redirect, body, jwt, set, cookie: { auth } }) => {
                                const { email, password } = body as User;

                                if (!email || !password) {
                                    set.status = 400;
                                    return { error: "Email and password are required." };
                                }

                                try {
                                    const user = await db
                                        .select()
                                        .from(usersTable)
                                        .where(eq(usersTable.email, email)) // Use the `eq` operator for the condition
                                        .get();
                                    if (!user) {
                                        set.status = 404;
                                        return { error: "User not found." };
                                    }

                                    const passwordMatch = await comparePassword(password, await user.password);
                                    if (!passwordMatch) {
                                        set.status = 401;
                                        return { error: "Invalid credentials." };
                                    }
                                    const userId = user.id as number;
                                    const token = await jwt.sign({ userId });

                                    auth.set({
                                        value: token,
                                        httpOnly: true,
                                        secure: true,
                                        sameSite: "strict",
                                        path: "/",
                                        maxAge: 60 * 60 * 24, // 1 day
                                    });

                                    return redirect("/");
                                } catch (error) {
                                    set.status = 500;
                                    console.warn(error);
                                    return { error: "Error logging in user." };
                                }
                            }))
                .get("/logout", ({ cookie: { auth }, redirect }) => {
                    auth.remove();
                    return redirect("/auth");
                }));
    }
}


export const auth = new AuthModule();