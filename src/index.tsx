import { Elysia } from 'elysia';
import { html, Html } from '@elysiajs/html';
import * as elements from 'typed-html';
// Application
const app = new Elysia();

app.use(html());

const BaseHtml = ({ children }: elements.Children) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>The PoyoWeb!</title>
    </head>
    <body>
      ${children}
    </body>
  </html>
`

app.get('/', ({ html }) => {
  return html(
  <BaseHtml>
    <h1>Hello, PoyoWeb!</h1>
  </BaseHtml>
  );
});

app.listen(3000);
console.log('PoyoWeb Server running at http://localhost:3000/');