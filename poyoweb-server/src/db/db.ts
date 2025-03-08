import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
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

export async function createSession(userId: number, expiresAt: number, ipAddress: string) {
  const sessionToken = uuidv4();
  const existingToken = await db.select().from(schema.authTokensTable).where({session_token: sessionToken });
  if (existingToken.length > 0) {
    return createSession(userId, expiresAt, ipAddress);
  }
  const jwtToken = jwt.sign({ sid: sessionToken }, process.env.JWT_SECRET!);
  const query = db.insert(schema.authTokensTable).values({ user_id: userId, session_token: sessionToken, expires_at: expiresAt, ip_address: ipAddress}).returning();
  return { query: await query, session_token: sessionToken, jwt_token: jwtToken };
}

export async function validateSession(sessionToken: string) {
  const token = await db.select().from(schema.authTokensTable).where(eq(schema.authTokensTable.sessionToken, sessionToken));
  if (token.length === 0) {
    return false;
  }
  const decoded = jwt.verify(sessionToken, process.env.JWT_SECRET!) as { sid: string };
  if (decoded.sid !== token[0].session_token) {
    return false;
  }
  return true;
}

export default db;