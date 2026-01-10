import { getDatabase, saveDatabase } from './connection';

const SCHEMA = `
-- User profile table
CREATE TABLE IF NOT EXISTS user_profile (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  daily_kcal_goal INTEGER DEFAULT 2000,
  daily_protein_goal INTEGER DEFAULT 120,
  daily_fat_goal INTEGER DEFAULT 65,
  daily_carbs_goal INTEGER DEFAULT 250,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Food log table
CREATE TABLE IF NOT EXISTS food_log (
  id TEXT PRIMARY KEY,
  food_id TEXT NOT NULL,
  portion TEXT NOT NULL CHECK (portion IN ('S', 'M', 'L')),
  logged_at TEXT DEFAULT (datetime('now')),
  kcal INTEGER NOT NULL,
  protein INTEGER NOT NULL,
  fat INTEGER NOT NULL,
  carbs INTEGER NOT NULL
);

-- Recent foods table (max 5, FIFO)
CREATE TABLE IF NOT EXISTS recent_food (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  food_id TEXT NOT NULL UNIQUE,
  last_used TEXT DEFAULT (datetime('now'))
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_food_log_date ON food_log(date(logged_at));
CREATE INDEX IF NOT EXISTS idx_recent_food_last_used ON recent_food(last_used DESC);
`;

export async function initializeDatabase(): Promise<void> {
  const db = await getDatabase();

  // Run schema
  db.run(SCHEMA);

  // Create default user if not exists
  const result = db.exec("SELECT COUNT(*) as count FROM user_profile");
  const count = result[0]?.values[0]?.[0] as number;

  if (count === 0) {
    db.run(`
      INSERT INTO user_profile (id, name, daily_kcal_goal, daily_protein_goal, daily_fat_goal, daily_carbs_goal)
      VALUES ('default', 'User', 2000, 120, 65, 250)
    `);
  }

  saveDatabase();
}
