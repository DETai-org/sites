const projects = [
  {
    name: "Francis Galton",
    description: "Инструмент для самонаблюдения, анализа состояний и глубинной рефлексии.",
    href: "/projects/francis-galton",
    icon: "🔍",
  },
  {
    name: "News Agent",
    description: "Агент обработки, фильтрации и интерпретации информационных потоков.",
    href: "/projects/news-agent",
    icon: "🗞️",
  },
  {
    name: "Matrix",
    description: "Система структурирования задач, процессов и внутренней динамики в логике DET.",
    href: "/projects/matrix",
    icon: "🧩",
  },
  {
    name: "Pulse",
    description: "Динамический трекер состояний и смысловых изменений.",
    href: "/projects/pulse",
    icon: "📈",
  },
  {
    name: "Infra",
    description: "Инфраструктурные агенты, обеспечивающие работу всей экосистемы DETai.",
    href: "/projects/infra",
    icon: "⚙️",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="w-full bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
        <div className="mb-10 flex flex-col gap-3 md:mb-12">
          <h2 className="text-2xl font-semibold leading-tight tracking-tight md:text-3xl">Проекты DETai</h2>
          <p className="max-w-3xl text-base leading-relaxed text-gray-700 md:text-lg">
            Практические инструменты, создаваемые на основе метода DET и работающие в технологической
            экосистеме DETai.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <a
              key={project.name}
              className="group flex h-full flex-col rounded-lg border border-gray-200 bg-gray-50 p-5 transition hover:border-gray-300 hover:bg-white"
              href={project.href}
            >
              <div className="flex items-center gap-3 text-lg font-semibold text-gray-900">
                <span aria-hidden>{project.icon}</span>
                <span>{project.name}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-gray-700 md:text-base">{project.description}</p>
              <span className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-medium text-gray-900 group-hover:underline">
                Подробнее →
              </span>
            </a>
          ))}
        </div>
        <div className="mt-10">
          <a className="text-sm font-semibold text-gray-900 hover:underline md:text-base" href="/detai/projects">
            Все проекты →
          </a>
        </div>
      </div>
    </section>
  );
}
