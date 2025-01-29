import { Html, html } from '@elysiajs/html';

interface User {
    username: string;
    id: number;
    email: string;
    tier: number;
}

interface Props {
    user?: User;
    files: any[];
}

const dashboardHtml = ({ user, files }: Props) => ( 
    <>
        <h1>PoyoWeb's Dashboard!</h1>
        <p>Upload, delete, rename and edit your files here.</p>
        {JSON.stringify(files)}
    </>
);

export default dashboardHtml;