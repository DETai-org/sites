import Heading from "../ui/Heading";
import Section from "../ui/Section";

export default function DetToDetaiBridge() {
  return (
    <Section variant="dark">
      <div className="flex flex-col gap-6 md:gap-8">
        <Heading level={2} color="soft">
          DET ↔ DETai
        </Heading>
        <p className="max-w-5xl text-lg leading-relaxed text-gold-soft md:text-xl">
          Диалектически-экзистенциальная терапия (DET) — это культура понимания человека, выросшая из экзистенциально-гуманистической
          традиции и опирающаяся на диалектическое видение внутренней динамики личности. DET не конкурирует с существующими школами,
          а создаёт ценностную и диалоговую рамку, в которой могут работать разные подходы и методы.
          DETai дополняет эту культуру технологическим уровнем: экосистемой продуктов, интерфейсов и AI-инструментов.
          Вместе они образуют единую систему — смысловой слой DET и технологическую форму DETai.
        </p>
      </div>
    </Section>
  );
}
