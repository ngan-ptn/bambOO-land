import initSqlJs, { type Database } from 'sql.js';

let db: Database | null = null;
let initPromise: Promise<Database> | null = null;

export async function getDatabase(): Promise<Database> {
  if (db) return db;

  if (initPromise) return initPromise;

  initPromise = (async () => {
    const SQL = await initSqlJs({
      locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
    });

    // Try to load from localStorage
    const saved = localStorage.getItem('ai-lead-db');
    if (saved) {
      const data = new Uint8Array(JSON.parse(saved));
      db = new SQL.Database(data);
    } else {
      db = new SQL.Database();
    }

    return db;
  })();

  return initPromise;
}

export function saveDatabase(): void {
  if (!db) return;

  const data = db.export();
  const arr = Array.from(data);
  localStorage.setItem('ai-lead-db', JSON.stringify(arr));
}

export function closeDatabase(): void {
  if (db) {
    saveDatabase();
    db.close();
    db = null;
    initPromise = null;
  }
}
