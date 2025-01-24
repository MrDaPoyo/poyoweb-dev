import { Database } from 'bun:sqlite';
import { join } from 'path';

// Connect to database
const db = new Database(join(import.meta.dir, 'poyoweb.db'));

// Helper to run queries that modify data
const run = (query, params = []) => {
    try {
        const stmt = db.prepare(query);
        const result = stmt.run(...params);
        return {
            id: result.lastInsertRowId,
            changes: result.changes
        };
    } catch (err) {
        throw err;
    }
};

// Helper to get single row
const get = (query, params = []) => {
    try {
        const stmt = db.prepare(query);
        return stmt.get(...params);
    } catch (err) {
        throw err;
    }
};

// Helper to get multiple rows
const all = (query, params = []) => {
    try {
        const stmt = db.prepare(query);
        return stmt.all(...params);
    } catch (err) {
        throw err;
    }
};

export {
    db,
    run,
    get,
    all
};
