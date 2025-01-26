import { Html, html } from '@elysiajs/html';

const authHtml = () => ( 
    <>
        <h1>Authenticate</h1>
        <form method="post" action="/auth/login">
            <h2>Login</h2>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" /><br/>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" /><br/>
            <input type="submit" />
        </form>
        <form method="post" action="/auth/register" hx-target="#auth" hx-swap="outerHTML">
            <h2>Register</h2>
            <label for="username">Username</label>
            <input type="text" id="username" name="username" /><br/>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" /><br/>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" /><br/>
            <input type="submit"/>
        </form>
    </>
);

export default authHtml;