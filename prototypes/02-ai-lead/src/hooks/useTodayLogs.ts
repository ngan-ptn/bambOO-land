import { useState, useEffect, useCallback } from 'react';
import type { FoodLog, DailySummary, PortionSize } from '../types';
import {
  getTodayLogs,
  getTodaySummary,
  addLog as dbAddLog,
  deleteLog as dbDeleteLog,
  getLogById,
} from '../db';
import foodData from '../data/foods.json';

interface UseTodayLogsReturn {
  logs: FoodLog[];
  summary: DailySummary;
  isLoading: boolean;
  addLog: (foodId: string, portion: PortionSize) => Promise<FoodLog>;
  deleteLog: (logId: string) => Promise<FoodLog | null>;
  refresh: () => Promise<void>;
}

const emptySummary: DailySummary = {
  date: new Date().toISOString().split('T')[0],
  total_kcal: 0,
  total_protein: 0,
  total_fat: 0,
  total_carbs: 0,
  meal_count: 0,
};

export function useTodayLogs(): UseTodayLogsReturn {
  const [logs, setLogs] = useState<FoodLog[]>([]);
  const [summary, setSummary] = useState<DailySummary>(emptySummary);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    const [logsData, summaryData] = await Promise.all([
      getTodayLogs(),
      getTodaySummary(),
    ]);
    setLogs(logsData);
    setSummary(summaryData);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addLog = useCallback(
    async (foodId: string, portion: PortionSize): Promise<FoodLog> => {
      const food = foodData.foods.find((f) => f.id === foodId);
      if (!food) throw new Error(`Food not found: ${foodId}`);

      const macros = food.portions[portion];
      const log = await dbAddLog(foodId, portion, macros);
      await refresh();
      return log;
    },
    [refresh]
  );

  const deleteLog = useCallback(
    async (logId: string): Promise<FoodLog | null> => {
      const log = await getLogById(logId);
      if (log) {
        await dbDeleteLog(logId);
        await refresh();
      }
      return log;
    },
    [refresh]
  );

  return { logs, summary, isLoading, addLog, deleteLog, refresh };
}
