import BodyText from "../ui/BodyText";
import DetDetaiMobileCard from "../ui/DetDetaiMobileCard";
import Heading from "../ui/Heading";
import Section from "../ui/Section";

export default function DetToDetaiBridge() {
  const paragraphs = [
    "DET — это диалектически-экзистенциальная терапия. Человек в ней рассматривается целостно — в единстве и борьбе противоположностей, в сочетании конструктивного и деструктивного, свободы и ограничения, выбора и ответственности. DET опирается на экзистенциальную диалектику переживания и задаёт ценностную рамку, из которой выстраивается терапевтическое взаимодействие с клиентом. Та же приверженность этим принципам объединяет профессиональное сообщество психотерапевтов, для которых важны глубина, честность и уважение к внутренней двойственности личности.",
    "В то же время DET осознанно соединяется с возможностями современных технологий, чтобы усилить и расширить терапевтический процесс, не подменяя его смысл машинной логикой.",
    "DETai — это технологическая форма этого соединения. Экосистема продуктов, интерфейсов и AI-инструментов, в которой искусственный интеллект ставится на службу психотерапии: для диагностики, сопровождения, отслеживания динамики и создания повседневных форм поддержки. Вместе DET и DETai формируют новый формат психотерапии — где культура понимания, методологическая глубина и технологии работают как единая система.",
  ];

  return (
    <Section variant="light">
      <div className="flex flex-col gap-mobile-6 md:gap-8">
        <Heading level={2}>
          DET ↔ DETai
        </Heading>
        <div className="hidden flex-col gap-6 md:flex md:max-w-4xl">
          {paragraphs.map((paragraph) => (
            <BodyText key={paragraph} className="text-basic-dark md:text-lg md:leading-relaxed">
              {paragraph}
            </BodyText>
          ))}
        </div>

        <DetDetaiMobileCard className="md:hidden" paragraphs={paragraphs} />
      </div>
    </Section>
  );
}
