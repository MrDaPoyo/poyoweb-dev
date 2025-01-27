import { Elysia } from 'elysia';
import { jwt } from '@elysiajs/jwt';
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
app.use(jwt({
  name: 'jwt',
  secret: process.env.AUTH_SECRET || 'superdupersecretthatssuperdupersecret1234',
}));

app.onRequest(async (context: any) => {
  const cookie = context.request.headers.cookie;
  const token = cookie?.auth;
  if (token) {
    try {
      const decoded = context.jwt.verify(token);
      context.user = decoded; // Attach user data to the context
    } catch (err) {
      context.user = false; // Invalid or expired token
    }
  } else {
    context.user = false; // No token provided
  }
});

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