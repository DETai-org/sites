import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const palette = [
  {
    token: "accent.primary",
    hex: "#C9A86A",
    bgClass: "bg-accentVar-primary",
    textClass: "text-basic-dark",
    labelClass: "text-basic-dark/80",
  },
  {
    token: "accent.active",
    hex: "#B8924F",
    bgClass: "bg-accentVar-active",
    textClass: "text-basic-light",
    labelClass: "text-basic-light/80",
  },
  {
    token: "accent.hover",
    hex: "#C69C5A",
    bgClass: "bg-accentVar-hover",
    textClass: "text-basic-dark",
    labelClass: "text-basic-dark/80",
  },
  {
    token: "accent.soft",
    hex: "#F2E5C2",
    bgClass: "bg-accentVar-soft",
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

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-16">
        <section className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold leading-tight">Цвета DETai</h1>
          <p className="max-w-4xl text-lg leading-relaxed text-muted">
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
          <h2 className="text-2xl font-semibold leading-tight">Шрифты бренда</h2>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {fonts.map((font) => (
              <div
                key={font.name}
                className="flex items-center justify-between rounded-lg border border-[color:rgb(var(--soft-border)/0.1)] px-4 py-3 text-lg"
              >
                <span className="text-muted">{font.name}</span>
                <span className={`text-xl font-semibold text-fg ${font.className}`}>
                  {font.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="palette-paper-preview background-paper flex min-h-[240px] items-center rounded-2xl border border-[color:rgb(var(--soft-border)/0.1)] p-8 text-fg shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:min-h-[300px]">
          <div className="flex max-w-4xl flex-col gap-4">
            <h2 className="text-2xl font-semibold leading-tight">Бумажный фон (эксперимент)</h2>
            <p className="text-lg leading-relaxed text-muted">
              Экспериментальный блок для проверки фирменной бумажной текстуры в интерфейсе.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
