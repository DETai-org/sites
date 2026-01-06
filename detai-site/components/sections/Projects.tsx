import HeadingLevel2 from "../ui/HeadingLevel2";
import Section from "../ui/Section";

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
    <Section id="projects">
      <div className="mb-mobile-6 flex flex-col gap-mobile-3 md:mb-12 md:gap-4">
        <HeadingLevel2>Проекты DETai</HeadingLevel2>
        <p className="max-w-mobile text-mobile-body text-fg md:max-w-2xl md:text-base md:leading-relaxed">
          Практические инструменты, создаваемые на основе метода DET и работающие в технологической экосистеме DETai.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-mobile-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {projects.map((project) => (
          <a
            key={project.name}
            className="group flex h-full flex-col gap-mobile-3 rounded-lg border border-accentVar/30 bg-accentSoftVar p-mobile-4 text-fg shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:border-accentVar hover:shadow-lg md:gap-4 md:p-5"
            href={project.href}
          >
            <div className="flex items-center gap-mobile-3 text-xl font-serif font-semibold text-fg md:gap-3 md:text-lg md:leading-tight">
              <span aria-hidden>{project.icon}</span>
              <span>{project.name}</span>
            </div>
            <p className="mt-mobile-2 text-mobile-body text-fg md:mt-1 md:text-base md:leading-relaxed">
              {project.description}
            </p>
            <span className="mt-mobile-3 inline-flex w-fit items-center gap-mobile-2 text-sm font-medium text-fg underline-offset-4 group-hover:underline md:gap-2 md:text-base">
              Подробнее →
            </span>
          </a>
        ))}
      </div>
      <div className="mt-mobile-6 md:mt-10">
        <a className="text-mobile-body font-semibold text-fg underline-offset-4 hover:underline md:text-base" href="/detai/projects">
          Все проекты →
        </a>
      </div>
    </Section>
  );
}
