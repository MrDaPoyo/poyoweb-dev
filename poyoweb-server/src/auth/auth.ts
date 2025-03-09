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
  .get("/", ({ ip }: {ip?: string}) => ip) // TODO: Remove this, this is just for testing --Poyo
  .post("/login", async ({ body, ip }: { body: { password: string; email: string }, ip: string}) => {
      const { password, email } = body;
      const userId = await verifyUser(email, password);
      if (userId) {
        const jwtToken = await createSession(
          userId,
          new Date(Date.now() + 30 * 86400000), // One month (30 days)
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
  .post("/register", async ({ body }: {body: {password: string, email: string, name: string}}) => {
    const { password, email, name } = (await body) as User;
    const nameRegex = /^[a-zA-Z0-9][\w-]{2,16}$/;
    if (!nameRegex.test(name)) {
      return { result: "Invalid name format. Name must start with a letter or number and contain only letters, numbers, underscores, or hyphens. Length must be 2-16 characters." };
    }
    if (!password || !email || !name) {
      return { result: "Missing fields" };
    }
    const result = await registerUser(email, password, name);
    return { result };
  },
  {
    body: t.Object({
      password: t.String(),
      email: t.String(),
      name: t.String(),
    }),
  });

export default router;
