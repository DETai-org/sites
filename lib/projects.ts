export type Project = {
  id: string;
  title: string;
  description: string;
  avatarSrc: string;
  href: string;
  echelon: 1 | 2 | 3;
  status?: "ready" | "in-progress";
  featured?: boolean;
  order?: number;
};

const DEFAULT_AVATAR = "/images/avatars_projects/Мед.png";

export const projects: Project[] = [
  {
    id: "galton",
    title: "Francis Galton",
    description:
      "Ваш цифровой психометрист. Измеряем личность с научной строгостью и человеческим пониманием.",
    avatarSrc: DEFAULT_AVATAR,
    echelon: 1,
    href: "/projects/galton",
    status: "ready",
  },
  {
    id: "assistants",
    title: "Агенты сопровождения",
    description:
      "Скоро: персональные помощники DETai, удерживающие дневники, динамику и обратную связь между сессиями.",
    avatarSrc: DEFAULT_AVATAR,
    echelon: 2,
    href: "/projects/assistants",
    status: "in-progress",
  },
  {
    id: "research",
    title: "Исследовательские модули",
    description:
      "Скоро: инструменты для наблюдений, аналитики и картирования состояний внутри единой методологической рамки.",
    avatarSrc: DEFAULT_AVATAR,
    echelon: 3,
    href: "/projects/matrix",
    status: "in-progress",
  },
];

export const projectsTeaserConfig = [
  { echelon: 1 as const, index: 0 },
  { echelon: 2 as const, index: 0 },
  { echelon: 3 as const, index: 0 },
];
