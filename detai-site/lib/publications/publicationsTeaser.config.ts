export type PublicationsTeaserGroup = {
  limitDesktop: number;
  limitMobile: number;
  slugs: string[];
};

export type PublicationsTeaserConfig = {
  articles: PublicationsTeaserGroup;
  dissertations: PublicationsTeaserGroup;
  thesis: PublicationsTeaserGroup;
};

export const publicationsTeaserConfig: PublicationsTeaserConfig = {
  articles: {
    limitDesktop: 3,
    limitMobile: 2,
    slugs: [
      "personality-typology-ethical-psychology",
      "good-evil-self-actualization",
    ],
  },
  dissertations: {
    limitDesktop: 3,
    limitMobile: 2,
    slugs: ["ethical-representations-dissertation"],
  },
  thesis: {
    limitDesktop: 3,
    limitMobile: 2,
    slugs: [
      "dialektika-dobra-i-zla-kak-resurs",
      "civilizational-tension-psychotherapy",
      "eros-thanatos-nuclear-threat",
    ],
  },
};
