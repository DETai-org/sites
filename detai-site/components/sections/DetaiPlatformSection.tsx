import BodyText from "../ui/BodyText";
import Heading from "../ui/Heading";
import Section from "../ui/Section";

export default function DetaiPlatformSection() {
  return (
    <Section variant="light" id="detai-platform">
      <div className="flex flex-col gap-mobile-4 md:gap-6">
        <Heading level={2}>Платформа DETai</Heading>
        <BodyText variant="sectionDefaultOnLight">
          DETai создаёт AI-инструменты и цифровые решения, которые усиливают, поддерживают и расширяют практики DET в
          соответствии с её ценностной и методологической рамкой.
        </BodyText>
      </div>
    </Section>
  );
}
