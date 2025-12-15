import BodyText from "@/components/ui/BodyText";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-basic-light text-basic-dark">
      <Header />
      <main className="flex flex-1 flex-col">
        <Section>
          <div className="flex flex-col gap-mobile-4 md:gap-6">
            <Heading level={1}>Смысл логотипа DET</Heading>
            <BodyText className="text-basic-dark md:text-xl md:leading-relaxed">
              Здесь появится история и семантика логотипа DET: как он отражает диалектическую динамику, ключевые смыслы метода и
              связь с экосистемой DETai. Раздел находится в разработке.
            </BodyText>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
