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
            <Heading level={1}>Проекты DETai</Heading>
            <BodyText className="text-fg md:text-xl md:leading-relaxed">
              Здесь появится навигация по проектам DETai: от аналитических инструментов до интерфейсов сопровождения. Мы готовим
              информацию, чтобы можно было быстро перейти к нужному продукту и узнать о нём больше.
            </BodyText>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
