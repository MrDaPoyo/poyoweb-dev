import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "Hello PoyoDevs! This is the PoyoWeb's API. :3").listen(3000);

console.log(
  `PoyoWeb Server running at ${app.server?.hostname}:${app.server?.port} :3`
);
