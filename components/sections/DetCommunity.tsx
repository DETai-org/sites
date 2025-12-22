import BodyText from "../ui/BodyText";
import HeadingLevel2 from "../ui/HeadingLevel2";
import Section from "../ui/Section";

export default function DetCommunity() {
  return (
    <Section
      id="det-community"
      variant="dark"
      className="bg-basic-dark"
      containerClassName="flex flex-col gap-mobile-3 md:gap-4"
    >
      <HeadingLevel2 color="soft">Сообщество и общий костёр</HeadingLevel2>
      <BodyText className="max-w-4xl text-mobile-body text-accent-soft md:text-base md:leading-relaxed">
        Мы объединяем психологов, психотерапевтов и людей, идущих путём самопознания — чтобы быть у общего костра: чувствовать
        родство, честность и глубину.
        <br />
        <br />
        Мы развиваем психотерапию, служа гуманистическим принципам, и ставим современные технологии на службу личности — не
        вместо человека, а рядом с ним.
        <br />
        <br />
        Так рождается общая культура и атмосфера: коллективная psychē — живая душа сообщества.
      </BodyText>
    </Section>
  );
}
