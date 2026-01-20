import Link from "next/link";

const postulates = [
  {
    title: "Тень и свет",
    description:
      "Как внутренние противоположности создают глубину личности и дают источник смысла.",
    href: "/det/concept/shadow-and-light",
  },
  {
    title: "Типы личности",
    description:
      "Карта различий восприятия и поведения, которая помогает увидеть уникальность каждого.",
    href: "/det/concept/personality-types",
  },
  {
    title: "Установка на преодоление",
    description:
      "Переход от реакции к выбору и активному развитию через работу с трудностями.",
    href: "/det/concept/overcoming",
  },
];

export default function Page() {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-12">
      <header className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold text-fg">Концепция DET</h1>
        <p className="text-base text-muted">
          Раздел концепции — это введение в ядро DET. Здесь собраны основные
          ориентиры, которые раскрывают логику подхода и подводят к ключевым
          постулатам.
        </p>
        <p className="text-base text-muted">
          Три постулата ниже — это короткие «главы», которые дают сжатое и цельное
          представление о системе. Каждый из них можно читать отдельно, но вместе
          они формируют фундамент.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {postulates.map((postulate) => (
          <Link
            key={postulate.href}
            className="flex h-full flex-col gap-3 rounded-xl border border-border bg-surface p-5 transition hover:border-accentVar"
            href={postulate.href}
          >
            <span className="text-lg font-semibold text-fg">
              {postulate.title}
            </span>
            <span className="text-sm text-muted">{postulate.description}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
