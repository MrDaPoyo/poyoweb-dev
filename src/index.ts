import { Elysia } from "elysia";
import { html, Html } from '@elysiajs/html'

const app = new Elysia();
app.use(html());

app.get("/", () => {
  return `<Header>Hi, I'm PoyoWeb</Header>`;
});

app.listen(3000);

console.log(
  `The PoyoWeb is running at ${app.server?.hostname}:${app.server?.port}`
);
