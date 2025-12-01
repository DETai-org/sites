export default function DetDetaiSplit() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-12 md:py-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Выберите направление
          </h2>
          <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-center md:gap-6">
            <a
              className="flex w-full flex-1 items-center justify-center px-6 py-4 text-base font-semibold text-gray-900 rounded-lg border border-gray-200 bg-white shadow-sm transition hover:border-gray-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              href="/det"
            >
              Перейти к DET
            </a>
            <a
              className="flex w-full flex-1 items-center justify-center px-6 py-4 text-base font-semibold text-gray-900 rounded-lg border border-gray-200 bg-white shadow-sm transition hover:border-gray-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              href="/detai"
            >
              Перейти к DETai
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
