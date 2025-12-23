import BodyText from "@/components/ui/BodyText";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import ProjectsListSection from "@/components/sections/ProjectsListSection";

export default function Page() {
  const extendedContainerClassName = "md:max-w-[96rem] md:px-16";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <Section containerClassName={extendedContainerClassName}>
          <div className="flex flex-col gap-mobile-4 md:gap-6">
            <Heading level={1}>Проекты DETai</Heading>
            <BodyText className="text-fg md:text-xl md:leading-relaxed">
              Здесь скоро появится подборка проектов DETai. Мы готовим описания, демо и навигацию по инструментам, которые
              развивают диалектически-экзистенциальную терапию с помощью современных технологий.
            </BodyText>
          </div>
        </Section>

        <ProjectsListSection containerClassName={extendedContainerClassName} />
      </main>
      <Footer />
    </div>
  );
}
