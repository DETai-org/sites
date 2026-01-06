import { readFileSync } from "fs";
import { join } from "path";

import BodyText from "../ui/BodyText";
import Heading from "../ui/Heading";
import Section from "../ui/Section";

const rawInfographicSvg = readFileSync(join(process.cwd(), "public/images/DETai-infographic.svg"), "utf-8");

const interactiveInfographicSvg = rawInfographicSvg
  .replace(/<\?xml[^>]*>/, "")
  .replace(
    '<g id="detai-petal-top">',
    '<g id="detai-petal-top" tabindex="0" role="button" aria-label="Инновационность" focusable="true">'
  )
  .replace(
    '<g id="detai-petal-right">',
    '<g id="detai-petal-right" tabindex="0" role="button" aria-label="Три эшелона" focusable="true">'
  )
  .replace(
    '<g id="detai-petal-bottom">',
    '<g id="detai-petal-bottom" tabindex="0" role="button" aria-label="Связность" focusable="true">'
  )
  .replace(
    '<g id="detai-petal-left">',
    '<g id="detai-petal-left" tabindex="0" role="button" aria-label="Стандарт" focusable="true">'
  )
  .replace(
    '<g id="detai-circle">',
    '<g id="detai-circle" tabindex="0" role="button" aria-label="DETai" focusable="true">'
  );

const infographicWrapperClasses = [
  "relative w-full max-w-5xl mx-auto",
  "[&_svg]:h-auto [&_svg]:w-full",
  "[&_#detai-petal-top]:cursor-pointer [&_#detai-petal-top]:transition-transform [&_#detai-petal-top]:duration-300 [&_#detai-petal-top]:ease-out [&_#detai-petal-top]:origin-center [&_#detai-petal-top]:[transform-box:fill-box]",
  "[&_#detai-petal-top:hover]:-translate-y-3 [&_#detai-petal-top:focus]:-translate-y-3 [&_#detai-petal-top:focus-visible]:-translate-y-3",
  "[&_#detai-petal-top:hover]:drop-shadow-[0_14px_28px_rgb(var(--accent)/0.3)] [&_#detai-petal-top:focus-visible]:drop-shadow-[0_14px_28px_rgb(var(--accent)/0.3)]",
  "[&_#detai-petal-top>g:nth-of-type(1)>path]:fill-accent-active [&_#detai-petal-top>g:nth-of-type(1)>path]:transition-colors [&_#detai-petal-top>g:nth-of-type(1)>path]:duration-300",
  "[&_#detai-petal-top>g:nth-of-type(2)>path]:fill-accent-soft/70 [&_#detai-petal-top>g:nth-of-type(2)>path]:transition-colors [&_#detai-petal-top>g:nth-of-type(2)>path]:duration-300",
  "[&_#detai-petal-top:hover>g:nth-of-type(1)>path]:fill-accent-primary [&_#detai-petal-top:focus-visible>g:nth-of-type(1)>path]:fill-accent-primary",
  "[&_#detai-petal-right]:cursor-pointer [&_#detai-petal-right]:transition-transform [&_#detai-petal-right]:duration-300 [&_#detai-petal-right]:ease-out [&_#detai-petal-right]:origin-center [&_#detai-petal-right]:[transform-box:fill-box]",
  "[&_#detai-petal-right:hover]:translate-x-3 [&_#detai-petal-right:focus]:translate-x-3 [&_#detai-petal-right:focus-visible]:translate-x-3",
  "[&_#detai-petal-right:hover]:drop-shadow-[0_14px_28px_rgb(var(--accent)/0.3)] [&_#detai-petal-right:focus-visible]:drop-shadow-[0_14px_28px_rgb(var(--accent)/0.3)]",
  "[&_#detai-petal-right>g:nth-of-type(1)>path]:fill-accent-hover [&_#detai-petal-right>g:nth-of-type(1)>path]:transition-colors [&_#detai-petal-right>g:nth-of-type(1)>path]:duration-300",
  "[&_#detai-petal-right>g:nth-of-type(2)>path]:fill-accent-soft/70 [&_#detai-petal-right>g:nth-of-type(2)>path]:transition-colors [&_#detai-petal-right>g:nth-of-type(2)>path]:duration-300",
  "[&_#detai-petal-right:hover>g:nth-of-type(1)>path]:fill-accent-active [&_#detai-petal-right:focus-visible>g:nth-of-type(1)>path]:fill-accent-active",
  "[&_#detai-petal-bottom]:cursor-pointer [&_#detai-petal-bottom]:transition-transform [&_#detai-petal-bottom]:duration-300 [&_#detai-petal-bottom]:ease-out [&_#detai-petal-bottom]:origin-center [&_#detai-petal-bottom]:[transform-box:fill-box]",
  "[&_#detai-petal-bottom:hover]:translate-y-3 [&_#detai-petal-bottom:focus]:translate-y-3 [&_#detai-petal-bottom:focus-visible]:translate-y-3",
  "[&_#detai-petal-bottom:hover]:drop-shadow-[0_14px_28px_rgb(var(--accent)/0.3)] [&_#detai-petal-bottom:focus-visible]:drop-shadow-[0_14px_28px_rgb(var(--accent)/0.3)]",
  "[&_#detai-petal-bottom>g:nth-of-type(1)>path]:fill-accent-primary [&_#detai-petal-bottom>g:nth-of-type(1)>path]:transition-colors [&_#detai-petal-bottom>g:nth-of-type(1)>path]:duration-300",
  "[&_#detai-petal-bottom>g:nth-of-type(2)>path]:fill-accent-soft/70 [&_#detai-petal-bottom>g:nth-of-type(2)>path]:transition-colors [&_#detai-petal-bottom>g:nth-of-type(2)>path]:duration-300",
  "[&_#detai-petal-bottom:hover>g:nth-of-type(1)>path]:fill-accent-hover [&_#detai-petal-bottom:focus-visible>g:nth-of-type(1)>path]:fill-accent-hover",
  "[&_#detai-petal-left]:cursor-pointer [&_#detai-petal-left]:transition-transform [&_#detai-petal-left]:duration-300 [&_#detai-petal-left]:ease-out [&_#detai-petal-left]:origin-center [&_#detai-petal-left]:[transform-box:fill-box]",
  "[&_#detai-petal-left:hover]:-translate-x-3 [&_#detai-petal-left:focus]:-translate-x-3 [&_#detai-petal-left:focus-visible]:-translate-x-3",
  "[&_#detai-petal-left:hover]:drop-shadow-[0_14px_28px_rgb(var(--accent)/0.3)] [&_#detai-petal-left:focus-visible]:drop-shadow-[0_14px_28px_rgb(var(--accent)/0.3)]",
  "[&_#detai-petal-left>g:nth-of-type(1)>path]:fill-accent-soft [&_#detai-petal-left>g:nth-of-type(1)>path]:transition-colors [&_#detai-petal-left>g:nth-of-type(1)>path]:duration-300",
  "[&_#detai-petal-left>g:nth-of-type(2)>path]:fill-accent-soft/60 [&_#detai-petal-left>g:nth-of-type(2)>path]:transition-colors [&_#detai-petal-left>g:nth-of-type(2)>path]:duration-300",
  "[&_#detai-petal-left:hover>g:nth-of-type(1)>path]:fill-accent-primary [&_#detai-petal-left:focus-visible>g:nth-of-type(1)>path]:fill-accent-primary",
  "[&_#detai-circle]:cursor-pointer [&_#detai-circle]:transition-transform [&_#detai-circle]:duration-300 [&_#detai-circle]:ease-out",
  "[&_#detai-circle:hover]:scale-[1.02] [&_#detai-circle:focus-visible]:scale-[1.02]",
].join(" ");

export default function DetaiUmbrellaBrandSection() {
  return (
    <Section variant="light" id="detai-umbrella-brand">
      <div className="flex flex-col gap-mobile-4 md:gap-8">
        <div className="flex flex-col gap-mobile-3 md:gap-4">
          <Heading level={2}>DETai — Umbrella Brand</Heading>
          <BodyText variant="sectionDefaultOnLight">
            Один бренд. Разные инструменты. Единый язык, качество и репутация.
          </BodyText>
        </div>
        <div className={infographicWrapperClasses}>
          <div
            className="relative w-full"
            dangerouslySetInnerHTML={{ __html: interactiveInfographicSvg }}
          />
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1440 810"
          >
            <defs>
              <path id="detai-label-arc-top" d="M 610 230 Q 720 150 830 230" />
              <path id="detai-label-arc-right" d="M 900 320 Q 990 405 900 490" />
              <path id="detai-label-arc-bottom" d="M 610 585 Q 720 670 830 585" />
              <path id="detai-label-arc-left" d="M 540 490 Q 450 405 540 320" />
            </defs>
            <g className="fill-fg text-[14px] font-semibold tracking-[0.04em] md:text-[16px]">
              <text textAnchor="middle">
                <textPath href="#detai-label-arc-top" startOffset="50%">
                  Инновационность
                </textPath>
              </text>
              <text textAnchor="middle">
                <textPath href="#detai-label-arc-right" startOffset="50%">
                  Три эшелона
                </textPath>
              </text>
              <text textAnchor="middle">
                <textPath href="#detai-label-arc-bottom" startOffset="50%">
                  Связность
                </textPath>
              </text>
              <text textAnchor="middle">
                <textPath href="#detai-label-arc-left" startOffset="50%">
                  Стандарт
                </textPath>
              </text>
            </g>
          </svg>
        </div>
      </div>
    </Section>
  );
}
