import type { DailySummary as DailySummaryType } from '../../types';
import { DEFAULT_GOALS } from '../../types';
import { CalorieRing } from './CalorieRing';
import { MacroBar } from './MacroBar';

interface DailySummaryProps {
  summary: DailySummaryType;
}

export function DailySummary({ summary }: DailySummaryProps) {
  return (
    <div className="card p-6">
      {/* Calorie ring centered */}
      <div className="flex justify-center mb-6">
        <CalorieRing current={summary.total_kcal} goal={DEFAULT_GOALS.kcal} />
      </div>

      {/* Macro bars */}
      <div className="space-y-3">
        <MacroBar
          label="Protein"
          current={summary.total_protein}
          goal={DEFAULT_GOALS.protein}
          color="#2563EB"
        />
        <MacroBar
          label="Carbs"
          current={summary.total_carbs}
          goal={DEFAULT_GOALS.carbs}
          color="#8B5CF6"
        />
        <MacroBar
          label="Fat"
          current={summary.total_fat}
          goal={DEFAULT_GOALS.fat}
          color="#F59E0B"
        />
      </div>
    </div>
  );
}
