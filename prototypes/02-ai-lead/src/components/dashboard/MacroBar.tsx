interface MacroBarProps {
  label: string;
  current: number;
  goal: number;
  unit?: string;
  color?: string;
}

export function MacroBar({
  label,
  current,
  goal,
  unit = 'g',
  color = 'var(--color-accent)',
}: MacroBarProps) {
  const progress = Math.min((current / goal) * 100, 100);

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-[var(--color-text-secondary)] w-16">
        {label}
      </span>
      <div className="flex-1 h-2 bg-[var(--color-surface)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-sm text-[var(--color-text-primary)] w-20 text-right">
        {current}/{goal}{unit}
      </span>
    </div>
  );
}
