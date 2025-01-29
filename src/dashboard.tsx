import { Elysia } from 'elysia';
import { jwt } from '@elysiajs/jwt';
import { html, Html } from '@elysiajs/html';

import { db, setupDB, getUserDataById, getFilesByUserId } from './db';

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
                ).guard(
                    {
                        async beforeHandle({ set, cookie: { auth }, jwt }) {
                            if (auth) {
                                var user = await jwt.verify(auth.value) as any;
                                app.state = { user } as any;
                                user = await getUserDataById(await user.userId);
                                if (!user) {
                                    set.status = 401;
                                    return { error: "You need to be logged in. :3c" };
                                }
                            }
                            app.state = { user: null } as any;
                        }
                    },
                    (app) =>
                        app
                            .get("/", async () => {
                                var user = app.state(user) as any;
                                var files = await getFilesByUserId(user.id);
                                console.log(files);
                                return <BaseHtml>
                                    <DashboardHtml user={user} files={files}/>
                                </BaseHtml>
                            })
    ))};
}