import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Header() {
  return (
    <header className="w-full border-b border-border/70 bg-canvas text-text">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <div className="text-lg font-serif font-semibold tracking-tight">DETai</div>
        <nav className="flex max-w-full flex-wrap items-center gap-3 text-xs font-sans font-medium sm:gap-4 sm:text-sm">
          <a className="hover:text-accent" href="/">
            Главная
          </a>
          <a
            className="hover:text-accent"
            href="https://data.ai/"
            rel="noreferrer"
            target="_blank"
          >
            Проекты
          </a>
          <a className="hover:text-accent" href="/det">
            DET
          </a>
          <a className="hover:text-accent" href="#mission">
            Миссия
          </a>
          <a className="hover:text-accent" href="/colors">
            Палитра
          </a>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
