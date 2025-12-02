import Heading from "../ui/Heading";
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
      <div className="mb-10 flex flex-col gap-3 md:mb-12">
        <Heading level={2}>Проекты DETai</Heading>
        <p className="max-w-3xl text-base leading-relaxed text-basic-dark md:text-lg">
          Практические инструменты, создаваемые на основе метода DET и работающие в технологической экосистеме DETai.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <a
            key={project.name}
            className="group flex h-full flex-col gap-2 p-5 text-basic-dark rounded-lg border border-gold-primary/30 bg-gold-soft shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:border-gold-primary hover:shadow-lg"
            href={project.href}
          >
            <div className="flex items-center gap-3 text-lg font-serif font-semibold leading-tight text-basic-dark">
              <span aria-hidden>{project.icon}</span>
              <span>{project.name}</span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-basic-dark md:text-base">{project.description}</p>
            <span className="mt-3 inline-flex w-fit items-center gap-2 text-sm font-medium text-basic-dark underline-offset-4 group-hover:underline">
              Подробнее →
            </span>
          </a>
        ))}
      </div>
      <div className="mt-10">
        <a className="text-sm font-semibold text-basic-dark underline-offset-4 hover:underline md:text-base" href="/detai/projects">
          Все проекты →
        </a>
      </div>
    </Section>
  );
}
