/**
 * Core data types for the Calorie Tracker App
 * These define the shape of food items, logs, and user goals
 */

// Portion size options: Small, Medium, Large
export type PortionSize = 'S' | 'M' | 'L'

// Nutritional values for a specific portion size
export interface PortionNutrition {
  kcal: number
  protein: number
  fat: number
  carbs: number
}

// Complete food item with all portion variants
export interface FoodItem {
  id: string
  name_vi: string      // Vietnamese name (displayed to users)
  name_en: string      // English name (for reference)
  category: FoodCategory
  portions: {
    S: PortionNutrition
    M: PortionNutrition
    L: PortionNutrition
  }
  serving: string      // Description like "1 bowl (450g)"
  confidence: number   // Data confidence score (0-1)
}

// Food categories for organizing the dataset
export type FoodCategory =
  | 'noodles'
  | 'rice'
  | 'banh_mi'
  | 'snacks'
  | 'drinks'
  | 'desserts'
  | 'clean_eating'

// A single logged meal entry
export interface LogEntry {
  id: string
  foodId: string
  name_vi: string      // Denormalized for display without lookup
  portion: PortionSize
  kcal: number
  protein: number
  carbs: number
  fat: number
  timestamp: number    // Unix timestamp in milliseconds
}

// User's daily nutrition goals (mocked for MVP)
export interface DailyGoals {
  dailyKcal: number
  dailyProtein: number
  dailyCarbs: number
  dailyFat: number
}

// Aggregated daily totals for dashboard display
export interface DailySummary {
  consumedKcal: number
  consumedProtein: number
  consumedCarbs: number
  consumedFat: number
  remainingKcal: number
  remainingProtein: number
  logs: LogEntry[]
}

// Recent items stored in localStorage
export interface RecentItem {
  foodId: string
  name_vi: string
  lastLogged: number
}

// Toast notification types for user feedback
export type ToastVariant = 'success' | 'undo' | 'error'

export interface ToastState {
  visible: boolean
  message: string
  variant: ToastVariant
  // When defined, legacy flows render a single Undo button that calls this handler.
  undoAction?: () => void
  // New flows use explicit flags to control whether Undo/Edit buttons should be shown;
  // this keeps the view logic declarative and allows the same type to support both apps.
  showUndo?: boolean
  showEdit?: boolean
}

// App state for context/store
export interface AppState {
  logs: LogEntry[]
  recentItems: RecentItem[]
  goals: DailyGoals
  isOffline: boolean
}

// Auth & User Management Types

export interface User {
  email: string
  password: string  // Note: stored as plain text in localStorage (prototype only)
  name: string
  avatar: string    // Single character or emoji
}

export interface Session {
  isLoggedIn: boolean
  lastActive: number  // Unix timestamp
}

export interface UserProfile {
  dailyCalories: number
  goal: GoalType
  goalIcon: string
  goalText: string
}

export type GoalType = 'lose' | 'healthy' | 'maintain' | 'muscle'

export interface GoalOption {
  key: GoalType
  icon: string
  title: string
  description: string
  suggestedCalories: number
}

export interface AuthContextValue {
  user: User | null
  session: Session | null
  profile: UserProfile | null
  isAuthenticated: boolean
  login: (email: string, password: string, rememberMe: boolean) => Promise<boolean>
  register: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
  updateGoals: (updates: Partial<UserProfile>) => void
  changePassword: (currentPassword: string, newPassword: string) => boolean
  resetPassword: (email: string, newPassword: string) => boolean
}
