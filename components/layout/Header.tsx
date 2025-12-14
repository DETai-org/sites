export default function Header() {
  return (
    <header className="w-full border-b border-accent-primary/30 bg-basic-light text-basic-dark">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <div className="text-lg font-serif font-semibold tracking-tight">DETai</div>
        <nav className="flex items-center gap-4 text-sm font-sans font-medium">
          <a className="hover:text-accent-primary" href="#hero">
            Главная
          </a>
          <a className="hover:text-accent-primary" href="#projects">
            Проекты
          </a>
          <a className="hover:text-accent-primary" href="#fundament-det">
            Ядро DET
          </a>
          <a className="hover:text-accent-primary" href="#mission">
            Миссия
          </a>
          <a className="hover:text-accent-primary" href="/colors">
            Палитра
          </a>
        </nav>
      </div>
    </header>
  );
}
