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
        <form method="POST" enctype="multipart/form-data" action="/dashboard/fileUpload">
            <p>Upload a file :D</p>
            <input type="file" name="file" />
            <button type="submit">Upload</button>
        </form>
        {JSON.stringify(files)}
    </>
);

export default dashboardHtml;