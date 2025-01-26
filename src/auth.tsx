import Elysia from 'elysia';
import { db } from './db';
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

const hashPassword = async (password: string) => {
    return Bun.password.hash(password);
};

const comparePassword = async (password: string, hash: string) => {
    return Bun.password.verify(password, hash);
};

export class AuthModule {
    constructor() { }

    public setup(app: Elysia) {
        return app.group('/auth', (app) =>
            app.use(
                jwt({
                    name: 'jwt',
                    secret: String(process.env.AUTH_SECRET).toString(),
                })
            ).get("/", () => {
                return <BaseHtml>
                    <AuthHtml />
                </BaseHtml>
            })
                .post("/register", async ({ set, body, jwt, cookie: { auth }, params }) => {
                    const { username, password, email } = body as User;

                    if (!username || !password || !email ) {
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
                        });
                        console.log(result);
                        const userId = result.id as number;

                        auth.set({
                            value: await jwt.sign({ userId }),
                            httpOnly: true,
                            maxAge: 7 * 86400,
                            path: '/profile',
                        })

                        return { message: "User registered successfully." };
                    } catch (error) {
                        set.status = 500;
                        return { error: "Error registering user." };
                    }
                })
                .post("/login", async ({ body, set, cookie: { auth } }) => {
                    const { email, password } = body as User;

                    if (!email || !password) {
                        set.status = 400;
                        return { error: "Email and password are required." };
                    }

                    try {
                        const user = db
                            .select()
                            .from(usersTable)
                            .where(usersTable.email.eq(email))
                            .get();

                        if (!user) {
                            set.status = 404;
                            return { error: "User not found." };
                        }

                        const passwordMatch = await comparePassword(password, user.password);
                        if (!passwordMatch) {
                            set.status = 401;
                            return { error: "Invalid credentials." };
                        }

                        const token = jwt(user.id);

                        auth.set({
                            value: token,
                            httpOnly: true,
                            secure: true,
                            sameSite: "strict",
                            path: "/",
                            maxAge: 60 * 60 * 24, // 1 day
                        });

                        return { message: "Login successful." };
                    } catch (error) {
                        set.status = 500;
                        return { error: "Error logging in user." };
                    }
                })
        );
    }
}


export const auth = new AuthModule();