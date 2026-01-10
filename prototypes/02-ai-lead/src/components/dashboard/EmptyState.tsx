interface EmptyStateProps {
  onAddClick: () => void;
}

export function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-24 h-24 mb-4 rounded-full bg-[var(--color-surface)] flex items-center justify-center">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-text-secondary)"
          strokeWidth="1.5"
          className="opacity-50"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
          <path d="M12 6v6l4 2" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-1">
        No meals logged yet
      </h3>
      <p className="text-sm text-[var(--color-text-secondary)] mb-4">
        Start tracking your nutrition today
      </p>
      <button onClick={onAddClick} className="btn-primary">
        Add your first meal
      </button>
    </div>
  );
}
