interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="px-5 pt-4 pb-2">
      <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">
        {title}
      </h1>
    </header>
  );
}
