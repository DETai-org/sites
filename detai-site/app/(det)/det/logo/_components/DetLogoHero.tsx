import Section from "@/components/ui/Section";
import AnimatedLogo from "@/components/visual/AnimatedLogo";

const logoSize = "clamp(14rem, 60vw, 32rem)";

export default function DetLogoHero() {
  return (
    <Section
      id="det-logo-hero"
      variant="dark"
      className="bg-basic-dark"
      containerClassName="flex min-h-[70vh] items-center justify-center md:min-h-[80vh]"
      fullWidth
    >
      <AnimatedLogo
        size={logoSize}
        className="mx-auto max-h-[80vw] max-w-[80vw] md:max-h-[28rem] md:max-w-[28rem]"
      />
    </Section>
  );
}
