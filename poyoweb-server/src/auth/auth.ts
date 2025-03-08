import { Elysia, t } from "elysia";
import { readDb, registerUser, verifyUser, createSession } from "../db/db";

interface User {
    email: string;
    password: string;
    name: string;
}

const router = new Elysia()
    .get("/", () => {
        return readDb();
    })
    .post("/login", async ({ body, set, request }) => {
            const { password, email } = await body;
            const userId = await verifyUser(email, password);
            if (userId) {
                const sessionId = await createSession(userId, new Date(Date.now() + 86400000), request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '');
                return { success: true, sessionId };
            } else {
                return { success: false };
            }
        },
        {
            body: t.Object({
                password: t.String(),
                email: t.String()
            })
        }
    )
    .post("/register", async ({ body }) => {
            const { password, email, name } = await body as User;
            const result = await registerUser(email, password, name);
            return { result };
        }
    );

export default router;