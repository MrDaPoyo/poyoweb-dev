import { Elysia, t } from "elysia";
import { ip } from "elysia-ip";
import { validateSession, registerUser, verifyUser, createSession, getUserDataBySession } from "../db/db";
import jwt from "jsonwebtoken";

interface User {
  email: string;
  password: string;
  username: string;
}

const oneMonth = 30 * 86400000; // Self explanatory

const router = new Elysia()
  .get("/", ({ ip }: {ip?: string}) => ip) // TODO: Remove this, this is just for testing --Poyo
  .post("/login", async ({ body, ip }: { body: { password: string; email: string }, ip: string}) => {
    // const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
    // const errorSleep = sleep(2000);
    try {
    const userId = await verifyUser(body.email, body.password);
      if (userId) {
        const jwtToken = await createSession(
          userId,
          new Date(Date.now() + oneMonth),
          ip
        );
        
        const actualJwt = jwtToken.jwt_token;
        return { success: true, jwt_token: actualJwt };
      } else {
        // await errorSleep;
        return { success: false };
      }
    } catch (e) {
      console.error(e);
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
    try {
      const { email, password, name } = body;
      const result = await registerUser(email, password, name, ip);
      return { result };
    } catch (e) {
      console.error(e);
      return { result: false };
    }
  },
  {
    body: t.Object({
      password: t.String(),
      email: t.String(),
      name: t.String({
        pattern: "^[a-zA-Z0-9][\\w-]{2,16}$",
      }),
    })
  }).post("/verifyJwt/:id", async ({ params: { id } }: { params: { id: string }}) => {
    const token = id;
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { sid: string };
    if (decoded) {
      const session = await validateSession(decoded.sid);
      if (session) {
        return { success: true, decoded: await getUserDataBySession(decoded.sid) };
      } else {
        return { success: false };
      }
    } else {
      return { success: false };
    }
  });

export default router;

async function testLogin() {
  const loginData = {
    email: "poyo@poyo.study",
    password: "poyopoyo",
  };

  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Login response:", data);
  } catch (error) {
    console.error("Login error:", error);
  }
}

async function testRegister() {
  const registerData = {
    email: "poyo@poyo.study",
    password: "poyopoyo",
    name: "poyo",
  };

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Register response:", data);
    } catch (error) {
      console.error("Register error:", error);
    }
  }

// testRegister();

testLogin(); // Call this function to execute the login test