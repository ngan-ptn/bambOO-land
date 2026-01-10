import { useState, useEffect, useCallback } from 'react';
import type { Food } from '../types';
import { getRecentFoodIds } from '../db';
import foodData from '../data/foods.json';

export function useRecentFoods() {
  const [recentFoods, setRecentFoods] = useState<Food[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    const ids = await getRecentFoodIds();
    const foods = ids
      .map((id) => (foodData.foods as Food[]).find((f) => f.id === id))
      .filter((f): f is Food => f !== undefined);
    setRecentFoods(foods);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { recentFoods, isLoading, refresh };
}
