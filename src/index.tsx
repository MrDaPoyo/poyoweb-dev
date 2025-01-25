import { Elysia } from 'elysia';
import { html, Html } from '@elysiajs/html';

import BaseHtml from './components/base';

// Application
const app = new Elysia();

app.use(html());

app.get('/', () => {
  return (
  <BaseHtml>
    <h1>Hello, PoyoWeb!</h1>
  </BaseHtml>
  );
});

app.listen(3000);
console.log('PoyoWeb Server running at http://localhost:3000/');