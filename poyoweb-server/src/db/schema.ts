import { integer, pgTable, varchar, timestamp, time } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm/sql";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  tier: integer().default(1).notNull(),
});

export const authTokensTable = pgTable("auth_tokens", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer().notNull().references(() => usersTable.id),
  expires_at: timestamp('expires_at').notNull().defaultNow(),
  session_token: varchar({ length: 255 }).notNull(),
  ip_address: varchar({ length: 255 }),
  creation_date: timestamp('creation_date').notNull().defaultNow(),
});

const schema = {
  usersTable,
  authTokensTable,
};

export default schema;