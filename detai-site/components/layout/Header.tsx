import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Header() {
  return (
    <header className="w-full border-b border-accentVar/30 bg-bg text-fg">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <div className="text-lg font-serif font-semibold tracking-tight">DETai</div>
        <nav className="flex max-w-full flex-wrap items-center gap-3 text-xs font-sans font-medium sm:gap-4 sm:text-sm">
          <a className="hover:text-accentVar" href="/">
            Главная
          </a>
          <a className="hover:text-accentVar" href="/detai/projects">
            Проекты
          </a>
          <a className="hover:text-accentVar" href="/det">
            DET
          </a>
          <a className="hover:text-accentVar" href="#mission">
            Миссия
          </a>
          <a className="hover:text-accentVar" href="/colors">
            Палитра
          </a>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
