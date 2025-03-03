import { Elysia } from 'elysia';

const app = new Elysia({ prefix: '/api' })
  .get('/', () => 'Hi Elysia');

export type App = typeof app;

// Handle both GET and POST requests
export const GET = ({ request }) => app.handle(request);
export const POST = ({ request }) => app.handle(request);