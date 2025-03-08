import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors';

import AuthRouter from "./auth/auth";

const app = new Elysia()
  .use(cors({
    origin: 'http://localhost:5173', // Allow SvelteKit frontend
    methods: ['GET', 'POST', 'PUT', 'UPDATE', 'DELETE'], // Allowed methods
  }))
  .get("/", () => "Hello PoyoDevs! This is the PoyoWeb's API. :3")
  .group('/auth', (app) =>
    app.use(AuthRouter)
  )
  .listen(3000);

console.log(
  `PoyoWeb Server running at ${app.server?.hostname}:${app.server?.port} :3`
);
