import { Elysia } from 'elysia';
import { html, Html } from '@elysiajs/html';

import { db } from './db';
import { AuthModule } from './auth';

import BaseHtml from './components/base';
import IndexHtml from './components/index';
import AuthHtml from './components/auth';

export const auth = new AuthModule();

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

app.get('/auth', () => {
  app.use(auth.setup);
});

app.listen(3000);
console.log('PoyoWeb Server running at http://localhost:3000/');