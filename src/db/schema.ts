import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  username: text().notNull(),
  password: text().notNull(),
  email: text().notNull().unique(),
  tier: int().notNull(),
  created_at: text().notNull(),
});

export const websitesTable = sqliteTable("websites_table", {
  id: int().primaryKey({ autoIncrement: true }),
  user_id: int().notNull().references(() => usersTable.id),
  domain: text().notNull().unique(),
  created_at: text().notNull(),
  last_updated: text().notNull(),
});