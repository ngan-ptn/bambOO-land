import type { Food, PortionSize } from '../../types';

interface PortionSheetProps {
  food: Food;
  onSelect: (portion: PortionSize) => void;
  onClose: () => void;
}

export function PortionSheet({ food, onSelect, onClose }: PortionSheetProps) {
  const portions: { size: PortionSize; label: string }[] = [
    { size: 'S', label: 'Small' },
    { size: 'M', label: 'Medium' },
    { size: 'L', label: 'Large' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 safe-bottom animate-slide-up">
        <div className="p-5">
          {/* Handle */}
          <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

          {/* Food info */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
              {food.name_vi}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {food.name_en}
            </p>
          </div>

          {/* Portion options */}
          <div className="space-y-3">
            {portions.map(({ size, label }) => {
              const macros = food.portions[size];
              return (
                <button
                  key={size}
                  onClick={() => onSelect(size)}
                  className="w-full card p-4 flex items-center justify-between hover:shadow-md transition-shadow duration-150 active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[var(--color-accent-muted)] text-[var(--color-accent)] flex items-center justify-center font-semibold text-sm">
                      {size}
                    </span>
                    <span className="font-medium text-[var(--color-text-primary)]">
                      {label}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[var(--color-text-primary)]">
                      {macros.kcal} kcal
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      P: {macros.protein}g · C: {macros.carbs}g · F: {macros.fat}g
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Cancel button */}
          <button
            onClick={onClose}
            className="w-full mt-4 py-3 text-[var(--color-text-secondary)] font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
