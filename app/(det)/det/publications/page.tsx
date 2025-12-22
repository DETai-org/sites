import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import BodyText from "@/components/ui/BodyText";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-basic-light text-basic-dark">
      <Header />
      <main className="flex flex-1 flex-col">
        <Section
          id="det-publications-page"
          variant="light"
          className="bg-basic-light"
          containerClassName="flex flex-col gap-mobile-3 md:gap-5"
        >
          <Heading level={1} color="basic">
            Публикации
          </Heading>
          <BodyText variant="sectionDefaultOnLight" className="max-w-4xl">
            Здесь будет собран полный список публикаций DET: статьи, диссертации, тезисы и доклады.<br />
            <br />
            Страница в разработке — скоро добавим навигацию по годам и форматам.
          </BodyText>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
