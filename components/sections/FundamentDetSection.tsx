import Button from "../ui/Button";
import BodyText from "../ui/BodyText";
import HeadingLevel2 from "../ui/HeadingLevel2";
import MobileExpandableText from "../ui/MobileExpandableText";
import Section from "../ui/Section";

export default function FundamentDetSection() {
  const paragraphs = [
    "DET — это культурная и методологическая рамка, которая помогает видеть человека в его глубине, движении и внутренней диалектике.",
    "Это надшкольный способ мышления: не “ещё одна психотерапевтическая школа”, а внутренняя позиция, вокруг которой может складываться сообщество людей, живущих общими ценностями. Эти ценности просты и жёстки: уважение к внутренней двойственности человека и безусловная вера во внутренний потенциал личности.",
    "DET вырастает из этих ценностей и подкрепляется научной обоснованностью — исследованием, наблюдением и моделями, которые помогают удерживать ясность и проверяемость.",
    "Если тебе откликаются ценностные основы и научная обоснованность — здесь начинается вход в глубинную часть DET.",
  ];

  return (
    <Section id="fundament-det">
      <div className="flex flex-col gap-mobile-6 md:gap-8">
        <HeadingLevel2>Основания DET</HeadingLevel2>
        <div className="hidden flex-col space-y-6 md:flex">
          {paragraphs.map((paragraph) => (
            <BodyText key={paragraph} variant="sectionDefaultOnLight">
              {paragraph}
            </BodyText>
          ))}
        </div>

        <MobileExpandableText
          className="md:hidden"
          paragraphs={paragraphs}
          textVariant="sectionDefaultOnLight"
        />
        <div className="flex flex-col gap-mobile-3 md:flex-row md:items-center md:gap-4">
          <Button as="a" href="/det" className="w-fit" variant="primary">
            DET концепция
          </Button>
          <Button as="a" href="/det/logo" className="w-fit" variant="secondary">
            Смысл логотипа DET
          </Button>
        </div>
      </div>
    </Section>
  );
}
