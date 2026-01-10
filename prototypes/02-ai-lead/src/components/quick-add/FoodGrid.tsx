import type { Food } from '../../types';
import { FoodTile } from './FoodTile';

interface FoodGridProps {
  foods: Food[];
  onFoodSelect: (food: Food) => void;
}

export function FoodGrid({ foods, onFoodSelect }: FoodGridProps) {
  if (foods.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-[var(--color-text-secondary)]">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="opacity-50 mb-3"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <p className="text-sm">No foods found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {foods.map((food) => (
        <FoodTile key={food.id} food={food} onClick={onFoodSelect} />
      ))}
    </div>
  );
}
