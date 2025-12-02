import Heading from "../ui/Heading";
import Section from "../ui/Section";

export default function Mission() {
  return (
    <Section id="mission" variant="dark">
      <div className="flex flex-col gap-6">
        <Heading level={2} color="soft">
          Наша миссия
        </Heading>
        <p className="max-w-4xl text-base leading-relaxed text-gold-soft md:text-lg">
          Создать новую терапевтическую логику, которая объединяет глубину экзистенциальной психологии и возможности современного
          интеллекта — человеческого и искусственного. DET и DETai — это путь к осмысленным инструментам, которые помогают людям
          понимать себя и развиваться.
        </p>
      </div>
    </Section>
  );
}
