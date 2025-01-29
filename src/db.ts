import 'dotenv/config';
import { filesTable, usersTable, websitesTable } from './db/schema';
import * as schema from './db/schema';
import { eq } from 'drizzle-orm';

import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
const sqlite = new Database(process.env.DB_FILE_NAME!);
const db = drizzle(sqlite, { schema });

async function setupDB() {
    await db.run(`
        CREATE TABLE IF NOT EXISTS users_table (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            tier INTEGER NOT NULL,
            created_at TEXT NOT NULL
        )
    `);

    await db.run(`
        CREATE TABLE IF NOT EXISTS websites_table (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            domain TEXT NOT NULL UNIQUE,
            created_at TEXT NOT NULL,
            last_updated TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users_table(id)
        )
    `);

    await db.run(`CREATE TABLE IF NOT EXISTS files_table (
            id INTEGER PRIMARY KEY AUTOINCREMENT,                           -- Unique ID for each file
            fileName TEXT NOT NULL,                                         -- Name of the file
            fileLocation TEXT NOT NULL,                                     -- Location (path) where the file is stored
            fileFullPath TEXT NOT NULL,
            userID INTEGER NOT NULL,                                        -- ID of the user who uploaded the file
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,                   -- Date and time when the file was created
            lastModifiedAt DATETIME DEFAULT CURRENT_TIMESTAMP,              -- Last modified date of the file
            fileSize INTEGER DEFAULT 0 NOT NULL,                            -- Weight (size) of the file in bytes
            status TEXT DEFAULT 'active',			                        -- Status of the file (e.g., active, archived, deleted)
            statusLastModifiedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userID) REFERENCES users_table(id))`)
}

async function getUserDataById(id: number) {
    if (!id) {
        return null;
    }
    return new Promise(async (resolve, reject) => {
        try {
            const result = await db.query.usersTable.findFirst({ where: eq(usersTable.id, id) });
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

async function insertFile(fileName: string, fileLocation: string, fileFullPath: string, userID: number, fileSize: number) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await db.insert(filesTable).values({
                fileName,
                fileLocation,
                fileFullPath,
                userID,
                fileSize
            });
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

async function getFilesByUserId(userId: number) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await db.select().from(filesTable).where(eq(filesTable.userID, userId));
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

export { db, setupDB, getUserDataById, insertFile, getFilesByUserId };