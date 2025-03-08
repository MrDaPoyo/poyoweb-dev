import { Elysia } from "elysia";

import AuthRouter from "./auth/auth";

const app = new Elysia()
  .get("/", () => "Hello PoyoDevs! This is the PoyoWeb's API. :3")
  .get("/db", () => `${process.env.DATABASE_URL}`)
  .group('/auth', (app) =>
    app.use(AuthRouter)
  )
  .listen(3000);

console.log(
  `PoyoWeb Server running at ${app.server?.hostname}:${app.server?.port} :3`
);
