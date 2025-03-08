import { Elysia, t } from "elysia";
import { readDb } from "../db/db";

const router = new Elysia()
    .get("/", () => `Authentication API. :P - ${JSON.stringify(readDb())}`)
    .post("/login", async ({ body }) => {
            const { password, email } = await body;
            console.log(`Login attempt with email: ${email} and password: ${password}`);
            return { password, email };
        },
        {
            body: t.Object({
                password: t.String(),
                email: t.String()
            })
        }
    );

export default router;