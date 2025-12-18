import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import DetDetaiMobileCard from "@/components/ui/DetDetaiMobileCard";

const palette = [
  {
    token: "accent.primary",
    hex: "#C9A86A",
    bgClass: "bg-accent-primary",
    textClass: "text-basic-dark",
    labelClass: "text-basic-dark/80",
  },
  {
    token: "accent.active",
    hex: "#B8924F",
    bgClass: "bg-accent-active",
    textClass: "text-basic-light",
    labelClass: "text-basic-light/80",
  },
  {
    token: "accent.hover",
    hex: "#C69C5A",
    bgClass: "bg-accent-hover",
    textClass: "text-basic-dark",
    labelClass: "text-basic-dark/80",
  },
  {
    token: "accent.soft",
    hex: "#F2E5C2",
    bgClass: "bg-accent-soft",
    textClass: "text-basic-dark",
    labelClass: "text-basic-dark/80",
  },
  {
    token: "basic.dark",
    hex: "#1E1B19",
    bgClass: "bg-basic-dark",
    textClass: "text-basic-light",
    labelClass: "text-basic-light/80",
  },
];

const fonts = [
  { name: "Open Sans", className: "font-sans" },
  { name: "Lora", className: "font-serif" },
  { name: "Great Vibes", className: "font-accent" },
];

const detDetaiMobileParagraphs = [
  "DET — это диалектически-экзистенциальная терапия, которая рассматривает человека целостно и опирается на единство противоположностей.",
  "DETai соединяет эту идею с технологиями, чтобы усиливать терапевтический процесс, не подменяя его машинной логикой.",
  "На мобильном интерфейсе мы тестируем разные световые фоны, чтобы найти баланс между мягкостью и читаемостью текста.",
];

const mobileCardVariants = [
  { title: "DET ↔ DETai — текущий фон", variant: "default" as const, label: "база" },
  { title: "DET ↔ DETai — бумажный фон (backgrounds.css)", variant: "paper" as const, label: "обновление" },
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col text-basic-light bg-basic-dark">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-16">
        <section className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold leading-tight">Цвета DETai</h1>
          <p className="max-w-4xl text-lg leading-relaxed text-basic-light/80">
            На этой странице собраны ключевые оттенки, чтобы увидеть их вместе и ощутить спокойное золотое ядро бренда.
          </p>
          <div className="grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {palette.map((color) => (
              <div
                key={color.token}
                className={`flex aspect-[4/3] items-center justify-center rounded-xl px-4 text-lg font-semibold ${color.textClass} ${color.bgClass}`}
              >
                <div className="flex flex-col items-center gap-1 text-center">
                  <span className={`text-sm font-medium uppercase tracking-wide ${color.labelClass}`}>
                    {color.token}
                  </span>
                  <span className="text-2xl font-bold">{color.hex}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold leading-tight">Экспериментальные мобильные карточки DETai</h2>
          <p className="text-basic-light/80">
            Фоны ниже показывают один и тот же мобильный блок DET ↔ DETai в двух вариантах: привычный градиент и обновлённый бумажный
            фон из `styles/backgrounds.css` для точного сравнения текстур.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {mobileCardVariants.map((card) => (
              <div
                key={card.title}
                className="flex flex-col gap-3 rounded-lg border border-white/10 bg-basic-dark/30 px-4 py-3 backdrop-blur-[2px]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-basic-light">{card.title}</span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-basic-light/60">{card.label}</span>
                </div>
                <DetDetaiMobileCard
                  variant={card.variant}
                  paragraphs={detDetaiMobileParagraphs}
                  className="md:!block md:!max-w-none"
                />
              </div>
            ))}
          </div>
          <p className="text-sm text-basic-light/70">
            Блоки остаются мобильными: на широкой версии сайта они не отображаются, а в мобильном виде помогают оценить два цветовых фона.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold leading-tight">Шрифты бренда</h2>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {fonts.map((font) => (
              <div
                key={font.name}
                className="flex items-center justify-between rounded-lg border border-white/10 px-4 py-3 text-lg"
              >
                <span className="text-basic-light/75">{font.name}</span>
                <span className={`text-xl font-semibold text-basic-light ${font.className}`}>
                  {font.name}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
