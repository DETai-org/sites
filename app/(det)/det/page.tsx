import BodyText from "@/components/ui/BodyText";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-basic-light text-basic-dark">
      <Header />
      <main className="flex flex-1 flex-col">
        <Section>
          <div className="flex flex-col gap-mobile-4 md:gap-6">
            <Heading level={1}>DET</Heading>
            <BodyText className="text-basic-dark md:text-xl md:leading-relaxed">
              Здесь появится главная страница направления DET: концепции, методология и навигация по ключевым материалам. Страница
              в разработке — скоро добавим подробности, чтобы можно было перейти к нужным разделам.
            </BodyText>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
