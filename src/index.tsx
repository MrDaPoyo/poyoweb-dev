import { Elysia } from 'elysia';
import { html, Html } from '@elysiajs/html';

import { db, setupDB } from './db';
import { AuthModule } from './auth';

import BaseHtml from './components/base';
import IndexHtml from './components/index';

export const auth = new AuthModule();

// Application
const app = new Elysia();

app.use(html());
app.use(auth.setup);

app.get('/', () => {
  return (
  <BaseHtml>
     <IndexHtml />
  </BaseHtml>
  );
});

app.get('/auth', () => {
  app.use(auth.setup);
});

setupDB();

app.listen(3000);
console.log('PoyoWeb Server running at http://localhost:3000/');