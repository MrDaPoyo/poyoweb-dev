import { Html, html } from '@elysiajs/html';

interface User {
    username: string;
    id: number;
    email: string;
    tier: number;
}

interface Props {
    user?: User;
}

const indexHtml = ({ user }: Props) => ( 
    <>
        <h1>Welcome to the PoyoWeb!</h1>
        <p>This is the PoyoWeb's dev server.</p>
        {user ? (
            <div>
                <p>Welcome, {user.username}!</p>
                <a href="/auth/logout">Logout</a>
            </div>
        ) : (
            <p>
                <a href="/auth">Authenticate</a> yourself, <strong>guest</strong>.
            </p>
        )}
    </>
);

export default indexHtml;