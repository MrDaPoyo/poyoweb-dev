import { Elysia, t } from "elysia";
import { ip } from "elysia-ip";
import { readDb, registerUser, verifyUser, createSession } from "../db/db";

interface User {
  email: string;
  password: string;
  name: string;
}

const oneMonth = 30 * 86400000; // Self explanatory

const router = new Elysia()
  .get("/", ({ ip }: {ip?: string}) => ip) // TODO: Remove this, this is just for testing --Poyo
  .post("/login", async ({ body, ip }: { body: { password: string; email: string }, ip: string}) => {
    const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
    const errorSleep = sleep(2000);  
    
    const { password, email } = body;
    const userId = await verifyUser(email, password);
      if (userId) {
        const jwtToken = await createSession(
          userId,
          new Date(Date.now() + oneMonth),
          ip
        );
        return { success: true, jwt_token: jwtToken.jwt_token };
      } else {
        await errorSleep;
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
  .post("/register", async ({ body, ip }: {body: {password: string, email: string, name: string}, ip: string}) => {
    const { password, email, name } = (await body) as User;
    const result = await registerUser(email, password, name, ip);
    return { result };
  },
  {
    body: t.Object({
      password: t.String(),
      email: t.String(),
      name: t.String({
        pattern: "^[a-zA-Z0-9][\w-]{2,16}$",
      }),
    }),
  });

export default router;
