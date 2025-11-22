export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <div className="text-lg font-semibold tracking-tight">DETai</div>
        <nav className="flex items-center gap-4 text-sm font-medium text-gray-700">
          <a className="hover:text-gray-900" href="#hero">
            Главная
          </a>
          <a className="hover:text-gray-900" href="#projects">
            Проекты
          </a>
          <a className="hover:text-gray-900" href="#core">
            Ядро DET
          </a>
          <a className="hover:text-gray-900" href="#mission">
            Миссия
          </a>
        </nav>
      </div>
    </header>
  );
}
