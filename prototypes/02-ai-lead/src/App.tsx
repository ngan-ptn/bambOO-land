import { useState, useCallback } from 'react';
import type { PortionSize, FoodLog } from './types';
import { useDatabase, useTodayLogs, useToast } from './hooks';
import { addLog as dbAddLog } from './db';
import { BottomNav, Toast } from './components/shared';
import { DashboardPage, QuickAddPage } from './pages';
import foodData from './data/foods.json';

type Tab = 'dashboard' | 'add';

function App() {
  const { isLoading: dbLoading, error: dbError } = useDatabase();
  const { logs, summary, deleteLog, refresh } = useTodayLogs();
  const { toast, show: showToast, dismiss: dismissToast, handleUndo } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [lastDeletedLog, setLastDeletedLog] = useState<FoodLog | null>(null);

  const handleLogFood = useCallback(
    async (foodId: string, portion: PortionSize) => {
      const food = foodData.foods.find((f) => f.id === foodId);
      if (!food) return;

      const macros = food.portions[portion];
      await dbAddLog(foodId, portion, macros);
      await refresh();

      showToast(`Added ${food.name_vi} (${portion})`, undefined);
      setActiveTab('dashboard');
    },
    [refresh, showToast]
  );

  const handleDeleteLog = useCallback(
    async (logId: string) => {
      const deletedLog = await deleteLog(logId);
      if (deletedLog) {
        setLastDeletedLog(deletedLog);
        const food = foodData.foods.find((f) => f.id === deletedLog.food_id);
        showToast(`Deleted ${food?.name_vi || 'meal'}`, async () => {
          // Undo: re-add the log
          if (lastDeletedLog) {
            await dbAddLog(
              lastDeletedLog.food_id,
              lastDeletedLog.portion,
              {
                kcal: lastDeletedLog.kcal,
                protein: lastDeletedLog.protein,
                fat: lastDeletedLog.fat,
                carbs: lastDeletedLog.carbs,
              }
            );
            await refresh();
          }
        });
      }
    },
    [deleteLog, showToast, refresh, lastDeletedLog]
  );

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  // Loading state
  if (dbLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-[var(--color-text-secondary)]">Loading...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (dbError) {
    return (
      <div className="flex-1 flex items-center justify-center p-5">
        <div className="text-center">
          <p className="text-red-500 mb-2">Failed to load database</p>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {dbError.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main content */}
      {activeTab === 'dashboard' ? (
        <DashboardPage
          logs={logs}
          summary={summary}
          onDeleteLog={handleDeleteLog}
          onAddClick={() => setActiveTab('add')}
        />
      ) : (
        <QuickAddPage onLogFood={handleLogFood} />
      )}

      {/* Bottom navigation */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          onUndo={toast.onUndo ? handleUndo : undefined}
          onDismiss={dismissToast}
        />
      )}
    </>
  );
}

export default App;
