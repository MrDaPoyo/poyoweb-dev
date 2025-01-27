import { Html, html } from '@elysiajs/html';

interface User {
    username: string;
    userId: number;
}

interface Props {
    user?: User;
}

const indexHtml = ({ user }: Props) => ( 
    <>
        <h1>Welcome to the PoyoWeb!</h1>
        <p>This is the PoyoWeb's dev server.</p>
        {user ? <p>Welcome, {user.userId}!</p> : <p><a href="/auth">Authenticate</a> yourself, <strong>guest</strong>.</p>}
    </>
);

export default indexHtml;