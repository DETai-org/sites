export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-gray-600 md:flex-row md:items-center md:justify-between">
        <div className="font-semibold text-gray-800">DETai</div>
        <div className="flex flex-wrap items-center gap-4">
          <a className="hover:text-gray-900" href="#projects">
            Проекты
          </a>
          <a className="hover:text-gray-900" href="#core">
            Ядро DET
          </a>
          <a className="hover:text-gray-900" href="#mission">
            Миссия
          </a>
        </div>
      </div>
    </footer>
  );
}
