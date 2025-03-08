import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
const db = drizzle(process.env.DB_URL!, { schema });

export function readDb() {
  return db.select().from(schema.usersTable);
}

export function registerUser(email: string, password: string, name: string) {
  password = bcrypt.hashSync(password, 10);
  return db.insert(schema.usersTable).values({ email, password, name }).returning();
}

export async function createSession(userId: number, expiresAt: Date) {
  const sessionToken = uuidv4();
  const existingToken = await db.select().from(schema.authTokensTable).where({session_token: sessionToken });
  if (existingToken.length > 0) {
    return createSession(userId, expiresAt);
  }
  const jwtToken = jwt.sign({ userId }, process.env.JWT_SECRET!);
  return { query: db.insert(schema.authTokensTable).values({ user_id: userId, expires_at: expiresAt, session_token: sessionToken }).returning(), session_token: sessionToken, jwt_token: jwtToken };
}

export default db;