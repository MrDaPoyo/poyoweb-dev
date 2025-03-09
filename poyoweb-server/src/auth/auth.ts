import { Elysia, t } from "elysia";
import { ip } from "elysia-ip";
import { readDb, registerUser, verifyUser, createSession } from "../db/db";

interface User {
  email: string;
  password: string;
  name: string;
}

const router = new Elysia()
  .use(ip())
  .get("/", ({ ip }: {ip?: string}) => ip)
  .post("/login", async ({ body, ip }: { body: { password: string; email: string }, ip: string}) => {
      const { password, email } = body;
      const userId = await verifyUser(email, password);
      if (userId) {
        const jwtToken = await createSession(
          userId,
          new Date(Date.now() + 86400000),
          ip
        );
        return { success: true, jwt_token: jwtToken.jwt_token };
      } else {
        return { success: false };
      }
    },
    {
      body: t.Object({
        password: t.String(),
        email: t.String(),
      }),
    }
  )
  .post("/register", async ({ body }) => {
    const { password, email, name } = (await body) as User;
    const result = await registerUser(email, password, name);
    return { result };
  });

export default router;
