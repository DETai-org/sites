import Section from "../ui/Section";

export default function Intro() {
  return (
    <Section variant="dark" className="block md:hidden" containerClassName="py-mobile-4">
      <p className="text-mobile-lg leading-mobile-normal text-accent-soft">
        Диалектически-экзистенциальная терапия — это культура понимания человека. DETai — это технологическая экосистема, включая продукты,
        интерфейсы и AI-инструменты, которые воплощают культуру DET в прикладных и ежедневных формах — доступных как клиентам, так и психотерапевтам.
      </p>
    </Section>
  );
}
