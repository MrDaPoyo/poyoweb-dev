import { Elysia, t } from "elysia";
import { readDb, registerUser, verifyUser } from "../db/db";

interface User {
    email: string;
    password: string;
    name: string;
}

const router = new Elysia()
    .get("/", () => {
        return readDb();
    })
    .post("/login", async ({ body }) => {
            const { password, email } = await body;
            if (await verifyUser(email, password)) {
                return { success: true };
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