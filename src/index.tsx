import { Elysia } from 'elysia';
import { html, Html } from '@elysiajs/html';

import BaseHtml from './components/base';
import IndexHtml from './components/index';

// Application
const app = new Elysia();

app.use(html());

app.get('/', () => {
  return (
  <BaseHtml>
    <IndexHtml />
  </BaseHtml>
  );
});

app.listen(3000);
console.log('PoyoWeb Server running at http://localhost:3000/');