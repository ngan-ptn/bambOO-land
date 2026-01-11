/**
 * SQLite database connection manager for Calo Tracker.
 * Uses sql.js (WASM) for browser-based SQLite with IndexedDB persistence.
 */

import initSqlJs, { type Database, type SqlJsStatic } from 'sql.js'

// Database file name in IndexedDB
const DB_NAME = 'calo_tracker_db'
const INDEXEDDB_STORE = 'calo_tracker_store'

let sqlPromise: Promise<SqlJsStatic> | null = null
let db: Database | null = null
let dbInitPromise: Promise<Database> | null = null

/**
 * Initialises sql.js WASM module (singleton).
 * Loads WASM from public folder for reliable loading.
 */
async function getSql(): Promise<SqlJsStatic> {
  if (!sqlPromise) {
    sqlPromise = initSqlJs({
      locateFile: () => '/sql-wasm.wasm',
    })
  }
  return sqlPromise
}

/**
 * Saves database to IndexedDB for persistence.
 * Called after each write operation to ensure durability.
 */
async function saveToIndexedDB(database: Database): Promise<void> {
  const data = database.export()
  const buffer = new Uint8Array(data)

  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/e71ccb19-8803-4c40-9a90-3516a2291f99',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.ts:32',message:'saveToIndexedDB entry',data:{bufferSize:buffer.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  // #endregion

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(INDEXEDDB_STORE, 1)

    request.onupgradeneeded = () => {
      const idb = request.result
      if (!idb.objectStoreNames.contains(DB_NAME)) {
        idb.createObjectStore(DB_NAME)
      }
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/e71ccb19-8803-4c40-9a90-3516a2291f99',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.ts:40',message:'IndexedDB upgrade needed',data:{storeName:DB_NAME},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
    }

    request.onsuccess = () => {
      const idb = request.result
      const transaction = idb.transaction(DB_NAME, 'readwrite')
      const store = transaction.objectStore(DB_NAME)
      const putRequest = store.put(buffer, 'database')

      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/e71ccb19-8803-4c40-9a90-3516a2291f99',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.ts:48',message:'Put request initiated',data:{bufferSize:buffer.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion

      // Wait for put request to complete, not just transaction
      putRequest.onsuccess = () => {
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/e71ccb19-8803-4c40-9a90-3516a2291f99',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.ts:64',message:'Put request succeeded',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        resolve()
      }

      putRequest.onerror = () => {
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/e71ccb19-8803-4c40-9a90-3516a2291f99',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.ts:70',message:'Put request failed',data:{error:String(putRequest.error)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        reject(putRequest.error)
      }

      // Handle transaction errors and aborts
      transaction.onerror = () => {
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/e71ccb19-8803-4c40-9a90-3516a2291f99',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.ts:77',message:'Transaction error',data:{error:String(transaction.error)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        reject(transaction.error || new Error('Transaction failed'))
      }

      transaction.onabort = () => {
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/e71ccb19-8803-4c40-9a90-3516a2291f99',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.ts:83',message:'Transaction aborted',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        reject(new Error('Transaction was aborted'))
      }
    }

    request.onerror = () => {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/e71ccb19-8803-4c40-9a90-3516a2291f99',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.ts:72',message:'IndexedDB open failed',data:{error:String(request.error)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      reject(request.error)
    }
  })
}

/**
 * Loads database from IndexedDB if it exists.
 * Returns null if no saved database found.
 */
async function loadFromIndexedDB(): Promise<Uint8Array | null> {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/e71ccb19-8803-4c40-9a90-3516a2291f99',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.ts:63',message:'loadFromIndexedDB entry',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
  // #endregion

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(INDEXEDDB_STORE, 1)

    request.onupgradeneeded = () => {
      const idb = request.result
      if (!idb.objectStoreNames.contains(DB_NAME)) {
        idb.createObjectStore(DB_NAME)
      }
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/e71ccb19-8803-4c40-9a90-3516a2291f99',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.ts:70',message:'IndexedDB upgrade needed during load',data:{storeName:DB_NAME},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
    }

    request.onsuccess = () => {
      const idb = request.result
      const transaction = idb.transaction(DB_NAME, 'readonly')
      const store = transaction.objectStore(DB_NAME)
      const getRequest = store.get('database')

      getRequest.onsuccess = () => {
        const result = getRequest.result || null
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/e71ccb19-8803-4c40-9a90-3516a2291f99',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.ts:82',message:'Get request succeeded',data:{hasData:result!==null,dataSize:result?result.length:0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        resolve(result)
      }
      getRequest.onerror = () => {
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/e71ccb19-8803-4c40-9a90-3516a2291f99',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.ts:87',message:'Get request failed',data:{error:String(getRequest.error)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        reject(getRequest.error)
      }
    }

    request.onerror = () => {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/e71ccb19-8803-4c40-9a90-3516a2291f99',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.ts:93',message:'IndexedDB open failed during load',data:{error:String(request.error)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      reject(request.error)
    }
  })
}

/**
 * Gets or creates the database connection.
 * Initialises schema if database is new.
 * Prevents race conditions by reusing initialization promise.
 */
export async function getDatabase(): Promise<Database> {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/e71ccb19-8803-4c40-9a90-3516a2291f99',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.ts:151',message:'getDatabase entry',data:{hasExistingDb:db!==null,hasInitPromise:dbInitPromise!==null},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion

  // Return existing database if already initialized
  if (db) {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/e71ccb19-8803-4c40-9a90-3516a2291f99',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.ts:157',message:'Returning existing database',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    return db
  }

  // If initialization is in progress, wait for it
  if (dbInitPromise) {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/e71ccb19-8803-4c40-9a90-3516a2291f99',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.ts:163',message:'Waiting for concurrent initialization',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    return dbInitPromise
  }

  // Start initialization
  dbInitPromise = (async () => {
    const SQL = await getSql()
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/e71ccb19-8803-4c40-9a90-3516a2291f99',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.ts:170',message:'SQL.js loaded',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion

    // Try to load existing database from IndexedDB
    const savedData = await loadFromIndexedDB()

    if (savedData) {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/e71ccb19-8803-4c40-9a90-3516a2291f99',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.ts:176',message:'Loading database from IndexedDB',data:{dataSize:savedData.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      db = new SQL.Database(savedData)
    } else {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/e71ccb19-8803-4c40-9a90-3516a2291f99',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.ts:181',message:'Creating new database',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      db = new SQL.Database()
    }

    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/e71ccb19-8803-4c40-9a90-3516a2291f99',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.ts:186',message:'Database created/loaded',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion

    return db
  })()

  return dbInitPromise
}

/**
 * Persists current database state to IndexedDB.
 * Should be called after write operations.
 */
export async function persistDatabase(): Promise<void> {
  if (!db) {
    throw new Error('Database not initialised')
  }
  await saveToIndexedDB(db)
}

/**
 * Executes a SQL statement that modifies data.
 * Automatically persists changes to IndexedDB.
 */
export async function runSQL(sql: string, params?: unknown[]): Promise<void> {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/e71ccb19-8803-4c40-9a90-3516a2291f99',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.ts:126',message:'runSQL entry',data:{sql:sql.substring(0,50),hasParams:params!==undefined},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion

  const database = await getDatabase()
  database.run(sql, params as (string | number | null | Uint8Array)[])
  
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/e71ccb19-8803-4c40-9a90-3516a2291f99',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.ts:130',message:'SQL executed, persisting',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion

  await persistDatabase()

  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/e71ccb19-8803-4c40-9a90-3516a2291f99',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.ts:134',message:'runSQL completed',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
}

/**
 * Executes a SQL query and returns all results.
 * For read-only operations (no persistence needed).
 */
export async function querySQL<T>(
  sql: string,
  params?: unknown[]
): Promise<T[]> {
  const database = await getDatabase()
  const statement = database.prepare(sql)

  if (params) {
    statement.bind(params as (string | number | null | Uint8Array)[])
  }

  const results: T[] = []
  while (statement.step()) {
    results.push(statement.getAsObject() as T)
  }
  statement.free()

  return results
}

/**
 * Executes a SQL query and returns the first result or null.
 */
export async function queryOneSQL<T>(
  sql: string,
  params?: unknown[]
): Promise<T | null> {
  const results = await querySQL<T>(sql, params)
  return results[0] || null
}

/**
 * Executes multiple SQL statements in a transaction.
 * Rolls back on error, persists on success.
 */
export async function transactionSQL(
  statements: Array<{ sql: string; params?: unknown[] }>
): Promise<void> {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/e71ccb19-8803-4c40-9a90-3516a2291f99',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.ts:171',message:'transactionSQL entry',data:{statementCount:statements.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
  // #endregion

  const database = await getDatabase()

  try {
    database.run('BEGIN TRANSACTION')
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/e71ccb19-8803-4c40-9a90-3516a2291f99',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.ts:177',message:'Transaction begun',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion

    for (const { sql, params } of statements) {
      database.run(sql, params as (string | number | null | Uint8Array)[])
    }

    database.run('COMMIT')
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/e71ccb19-8803-4c40-9a90-3516a2291f99',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.ts:185',message:'Transaction committed, persisting',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    await persistDatabase()
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/e71ccb19-8803-4c40-9a90-3516a2291f99',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.ts:188',message:'Transaction completed successfully',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/e71ccb19-8803-4c40-9a90-3516a2291f99',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'connection.ts:191',message:'Transaction error, rolling back',data:{error:String(error)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    database.run('ROLLBACK')
    throw error
  }
}

/**
 * Closes the database connection and clears the singleton.
 * Useful for testing or cleanup.
 */
export function closeDatabase(): void {
  if (db) {
    db.close()
    db = null
  }
  dbInitPromise = null
}

/**
 * Exports database as Uint8Array for backup purposes.
 */
export async function exportDatabase(): Promise<Uint8Array> {
  const database = await getDatabase()
  return database.export()
}

/**
 * Gets approximate database size in bytes.
 */
export async function getDatabaseSize(): Promise<number> {
  const database = await getDatabase()
  const data = database.export()
  return data.length
}
