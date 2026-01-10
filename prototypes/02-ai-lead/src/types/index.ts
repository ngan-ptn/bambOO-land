// Food types
export type PortionSize = 'S' | 'M' | 'L';

export interface Macros {
  kcal: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface Food {
  id: string;
  name_vi: string;
  name_en: string;
  category: string;
  portions: Record<PortionSize, Macros>;
  serving: string;
  confidence: number;
}

export interface Category {
  id: string;
  name_vi: string;
  name_en: string;
}

export interface FoodDatabase {
  foods: Food[];
  categories: Category[];
}

// Log types
export interface FoodLog {
  id: string;
  food_id: string;
  portion: PortionSize;
  logged_at: string; // ISO date string
  kcal: number;
  protein: number;
  fat: number;
  carbs: number;
}

// Daily summary
export interface DailySummary {
  date: string;
  total_kcal: number;
  total_protein: number;
  total_fat: number;
  total_carbs: number;
  meal_count: number;
}

// User profile
export interface UserProfile {
  id: string;
  name: string;
  daily_kcal_goal: number;
  daily_protein_goal: number;
  daily_fat_goal: number;
  daily_carbs_goal: number;
  created_at: string;
}

// Default goals
export const DEFAULT_GOALS = {
  kcal: 2000,
  protein: 120,
  fat: 65,
  carbs: 250,
} as const;
