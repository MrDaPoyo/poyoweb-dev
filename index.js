import { Elysia } from 'elysia'
import { db } from './db.js'

new Elysia()
    .get('/', 'hello')
    .get('/hi', 'hi')
    .listen(3000)