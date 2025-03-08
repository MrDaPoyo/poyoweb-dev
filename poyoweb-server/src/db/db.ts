import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import bcrypt from 'bcryptjs';

const db = drizzle(process.env.DB_URL!);

export function readDb() {
  return db.select().from(schema.usersTable);
}

export function registerUser(email: string, password: string, name: string) {
  password = bcrypt.hashSync(password, 10);
  return db.insert(schema.usersTable).values({ email, password, name }).returning();
}

export default db;