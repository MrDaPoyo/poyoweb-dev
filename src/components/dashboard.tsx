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

interface Files {
    files: any;
}

const dashboardHtml = ({ user }: Props) => ( 
    <>
        <h1>PoyoWeb's Dashboard!</h1>
        <p>Upload, delete, rename and edit your files here.</p>
    </>
);

export default dashboardHtml;