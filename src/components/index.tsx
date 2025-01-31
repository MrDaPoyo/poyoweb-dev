import { Html, html } from '@elysiajs/html';
import React from 'react';

interface User {
    username: string;
    id: number;
    email: string;
    tier: number;
}

interface Props {
    user?: User;
}

export function indexHtml({ user }: React.PropsWithoutRef<Props>) {
    return (
        <>
            <h1>Welcome to the PoyoWeb!</h1>
            <p>This is the PoyoWeb's dev server.</p>
            {user ? (
                <div>
                    <p>Welcome, {user.username}!</p>
                    <span>Access the <a href="/dashboard">Dashboard</a> - <a href="/auth/logout">Logout</a></span>
                </div>
            ) : (
                <p>
                    <a href="/auth">Authenticate</a> yourself, <strong>guest</strong>.
                </p>
            )}
        </>
    );
}

export default indexHtml;