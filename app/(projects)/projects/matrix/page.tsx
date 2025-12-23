import BodyText from "@/components/ui/BodyText";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <Section>
          <div className="flex flex-col gap-mobile-4 md:gap-6">
            <Heading level={1}>Проект Matrix</Heading>
            <BodyText className="text-fg md:text-xl md:leading-relaxed">
              Страница-плейсхолдер проекта Matrix. Скоро мы добавим описание исследовательских модулей, сценарии применения и
              ссылки на демонстрации.
            </BodyText>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
