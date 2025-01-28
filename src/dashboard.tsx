import { Elysia } from 'elysia';
import { jwt } from '@elysiajs/jwt';
import { html } from '@elysiajs/html';

import { db, setupDB, getUserDataById } from './db';

import BaseHtml from './components/base';
import DashboardHtml from './components/dashboard';

export class DashboardModule {
    constructor() { }

    public setup(app: Elysia) {
        return app.group('/dashboard', (app) =>
            app
                .use(
                    jwt({
                        name: 'jwt',
                        secret: process.env.AUTH_SECRET || 'superdupersecretthatssuperdupersecret1234',
                    })
                ).get("/", (async ({ store }: { store: { user?: { userId: number } } }) => {
                    var userId = store.user?.userId as number;
                    const user = await getUserDataById(userId);
                    return <BaseHtml>
                        <DashboardHtml user={user} />
                    </BaseHtml>
                })
            ));
    }
}

export const dashboard = new DashboardModule();
