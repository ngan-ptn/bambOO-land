import type { FoodLog } from '../types';
import { Header } from '../components/shared';
import { DailySummary, MealList, EmptyState } from '../components/dashboard';

interface DashboardPageProps {
  logs: FoodLog[];
  summary: {
    total_kcal: number;
    total_protein: number;
    total_fat: number;
    total_carbs: number;
    meal_count: number;
    date: string;
  };
  onDeleteLog: (logId: string) => void;
  onAddClick: () => void;
}

export function DashboardPage({
  logs,
  summary,
  onDeleteLog,
  onAddClick,
}: DashboardPageProps) {
  const hasLogs = logs.length > 0;

  return (
    <div className="flex-1 flex flex-col pb-20">
      <Header title="Today" />

      <div className="flex-1 overflow-y-auto px-5 space-y-6">
        {/* Daily summary card */}
        <DailySummary summary={summary} />

        {/* Meal list or empty state */}
        {hasLogs ? (
          <MealList logs={logs} onDelete={onDeleteLog} />
        ) : (
          <EmptyState onAddClick={onAddClick} />
        )}
      </div>
    </div>
  );
}
