import { Elysia } from 'elysia';
import { jwt } from '@elysiajs/jwt';
import { html, Html } from '@elysiajs/html';

import { db, setupDB, getUserDataById } from './db';
import { AuthModule } from './auth';

import BaseHtml from './components/base';
import IndexHtml from './components/index';

export const auth = new AuthModule();

// Application
const app = new Elysia();

app.use(html())
  .use(auth.setup)
  .use(jwt({
    name: 'jwt',
    secret: process.env.AUTH_SECRET || 'superdupersecretthatssuperdupersecret1234',
  }))
  .group('/', (app) =>
    app.guard({
      async beforeHandle({ cookie: { auth }, jwt }) {
        if (auth) {
          const user = await jwt.verify(auth.value);
          if (!user) {
            app.state('user', null);
          }
          app.state('user', user);
        }
      }
    }, (app) =>
      app.get('/', async ({ store }: { store: { user?: { userId: number } } }) => {
        var userId = store.user?.userId as number;
        const user = await getUserDataById(userId);
        
        return (
          <BaseHtml>
            <IndexHtml user={user}/>
          </BaseHtml>
        );
      }
      )
    ))
  .get('/auth', () => {
    app.use(auth.setup);
  });

setupDB();

app.listen(3000);
console.log('PoyoWeb Server running at http://localhost:3000/');