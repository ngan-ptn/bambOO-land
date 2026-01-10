import { v4 as uuid } from 'uuid';
import { getDatabase, saveDatabase } from '../connection';
import type { FoodLog, DailySummary, PortionSize } from '../../types';

export async function addLog(
  foodId: string,
  portion: PortionSize,
  macros: { kcal: number; protein: number; fat: number; carbs: number }
): Promise<FoodLog> {
  const db = await getDatabase();
  const id = uuid();
  const now = new Date().toISOString();

  db.run(
    `INSERT INTO food_log (id, food_id, portion, logged_at, kcal, protein, fat, carbs)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, foodId, portion, now, macros.kcal, macros.protein, macros.fat, macros.carbs]
  );

  // Update recent foods
  db.run(
    `INSERT OR REPLACE INTO recent_food (food_id, last_used) VALUES (?, ?)`,
    [foodId, now]
  );

  // Keep only last 5 recent foods
  db.run(
    `DELETE FROM recent_food WHERE id NOT IN (
      SELECT id FROM recent_food ORDER BY last_used DESC LIMIT 5
    )`
  );

  saveDatabase();

  return {
    id,
    food_id: foodId,
    portion,
    logged_at: now,
    ...macros,
  };
}

export async function deleteLog(logId: string): Promise<void> {
  const db = await getDatabase();
  db.run('DELETE FROM food_log WHERE id = ?', [logId]);
  saveDatabase();
}

export async function getLogById(logId: string): Promise<FoodLog | null> {
  const db = await getDatabase();
  const result = db.exec(
    'SELECT id, food_id, portion, logged_at, kcal, protein, fat, carbs FROM food_log WHERE id = ?',
    [logId]
  );

  if (!result[0]?.values[0]) return null;

  const row = result[0].values[0];
  return {
    id: row[0] as string,
    food_id: row[1] as string,
    portion: row[2] as PortionSize,
    logged_at: row[3] as string,
    kcal: row[4] as number,
    protein: row[5] as number,
    fat: row[6] as number,
    carbs: row[7] as number,
  };
}

export async function getTodayLogs(): Promise<FoodLog[]> {
  const db = await getDatabase();
  const today = new Date().toISOString().split('T')[0];

  const result = db.exec(
    `SELECT id, food_id, portion, logged_at, kcal, protein, fat, carbs
     FROM food_log
     WHERE date(logged_at) = date(?)
     ORDER BY logged_at DESC`,
    [today]
  );

  if (!result[0]) return [];

  return result[0].values.map((row: unknown[]) => ({
    id: row[0] as string,
    food_id: row[1] as string,
    portion: row[2] as PortionSize,
    logged_at: row[3] as string,
    kcal: row[4] as number,
    protein: row[5] as number,
    fat: row[6] as number,
    carbs: row[7] as number,
  }));
}

export async function getTodaySummary(): Promise<DailySummary> {
  const db = await getDatabase();
  const today = new Date().toISOString().split('T')[0];

  const result = db.exec(
    `SELECT
       COALESCE(SUM(kcal), 0) as total_kcal,
       COALESCE(SUM(protein), 0) as total_protein,
       COALESCE(SUM(fat), 0) as total_fat,
       COALESCE(SUM(carbs), 0) as total_carbs,
       COUNT(*) as meal_count
     FROM food_log
     WHERE date(logged_at) = date(?)`,
    [today]
  );

  const row = result[0]?.values[0] || [0, 0, 0, 0, 0];

  return {
    date: today,
    total_kcal: row[0] as number,
    total_protein: row[1] as number,
    total_fat: row[2] as number,
    total_carbs: row[3] as number,
    meal_count: row[4] as number,
  };
}

export async function getRecentFoodIds(): Promise<string[]> {
  const db = await getDatabase();

  const result = db.exec(
    'SELECT food_id FROM recent_food ORDER BY last_used DESC LIMIT 5'
  );

  if (!result[0]) return [];

  return result[0].values.map((row: unknown[]) => row[0] as string);
}
