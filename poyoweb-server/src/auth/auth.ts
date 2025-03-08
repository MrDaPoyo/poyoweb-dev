import { Elysia, t } from "elysia";
import { readDb } from "../db/db";

const router = new Elysia()
    .get("/", () => `Authentication API. :P - ${JSON.stringify(readDb())}`)
    .post("/login", ({ body }) => {
            const { password, email } = body;
            return { password, email };
        },
        {
            body: t.Object({
                password: t.Number(),
                email: t.String()
            })
        }
    );

export default router;