import { Elysia } from 'elysia';
import { jwt } from '@elysiajs/jwt';
import { html, Html } from '@elysiajs/html';

import { db, setupDB } from './db';
import { AuthModule } from './auth';

import BaseHtml from './components/base';
import IndexHtml from './components/index';
import { convertIndexToString } from 'drizzle-orm/mysql-core';

export const auth = new AuthModule();

// Application
const app = new Elysia();

app.use(html());
app.use(auth.setup);
app.use(jwt({
  name: 'jwt',
  secret: process.env.AUTH_SECRET || 'superdupersecretthatssuperdupersecret1234',
}));

app.group('/', (app) =>
  app.guard({
    async beforeHandle({ set, cookie: { auth }, jwt, error }) {
      if (auth) {
        
      }
    }
  }, (app) =>
    app.get('/', ({}) => {
      return (
        <BaseHtml>
          <IndexHtml />
        </BaseHtml>
      );
    }
    )
  ));

app.get('/auth', () => {
  app.use(auth.setup);
});

setupDB();

app.listen(3000);
console.log('PoyoWeb Server running at http://localhost:3000/');