export default function Footer() {
  return (
    <footer className="w-full border-t border-border/70 bg-canvas text-text">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm md:flex-row md:items-center md:justify-between">
        <div className="font-serif font-semibold">DETai</div>
        <div className="flex flex-wrap items-center gap-4 font-sans font-medium">
          <a className="hover:text-accent" href="#projects">
            Проекты
          </a>
          <a className="hover:text-accent" href="#fundament-det">
            Ядро DET
          </a>
          <a className="hover:text-accent" href="#mission">
            Миссия
          </a>
        </div>
      </div>
    </footer>
  );
}
