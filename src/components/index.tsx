import { Html, html } from '@elysiajs/html';

const indexHtml = ({ user }: { user?: { username: string } }) => ( 
    <>
        <h1>Welcome to the PoyoWeb!</h1>
        <p>This is the PoyoWeb's dev server.</p>
        {user ? <p>Welcome, {user.username}!</p> : <p><a href="/auth">Authenticate</a> yourself, <strong>guest</strong>.</p>}
    </>
);

export default indexHtml;