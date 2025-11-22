export default function Hero() {
  return (
    <section id="hero" className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-16 md:flex-row md:items-center md:gap-10 md:py-24">
        <div className="flex-1">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 md:text-5xl">
            DET — Dialectical Existential Therapy.
            <br />
            Метод нового поколения в психотерапии.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-700 md:text-xl">
            DETai — технологическая экосистема, которая расширяет метод DET через два слоя
            интеллекта: Augmented Intelligence (обогащённый интеллект человека) и Artificial
            Intelligence (искусственный интеллект).
          </p>
        </div>
      </div>
    </section>
  );
}
