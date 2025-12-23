import BodyText from "@/components/ui/BodyText";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <Section>
          <div className="flex flex-col gap-mobile-4 md:gap-6">
            <Heading level={1}>DETai</Heading>
            <BodyText className="text-fg md:text-xl md:leading-relaxed">
              Страница технологической экосистемы DETai сейчас находится в разработке. Скоро здесь появится подробное
              описание продуктов, интерфейсов и инструментов, объединённых общей методологией DET.
            </BodyText>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
