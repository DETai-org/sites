import { BlogPostBase } from "./types";

export const baseBlogPosts: BlogPostBase[] = [
  {
    id: "eta-istoriya-pro-odnogo-cheloveka",
    slugs: {
      ru: "eta-istoriya-pro-odnogo-cheloveka",
      en: "this-story-about-one-person",
      de: "diese-geschichte-uber-eine-person",
      fi: "tama-tarina-yhdesta-ihmisesta",
      cn: "zhe-shi-yi-ge-ren-de-gu-shi",
    },
    titles: {
      ru: "Эта история про одного человека",
      en: "This story is about one person",
      de: "Diese Geschichte handelt von einer Person",
      fi: "Tämä tarina kertoo yhdestä ihmisestä",
      cn: "这是关于一个人的故事",
    },
    publishedAt: "2016-05-16T10:08:00+03:00",
    author: "Anton",
    status: "publish",
    originalLink:
      "https://antonkolhonen.com/trenirovki/eta-istoriya-pro-odnogo-cheloveka",
    wordpressId: 3026,
    categories: [
      { title: "Психология", slug: "psihologiya" },
      { title: "Тренировки", slug: "trenirovki" },
    ],
    tags: [],
    coverImage: {
      src: "/images/posts/maxresdefault.jpg",
      width: 1280,
      height: 720,
      alt: "Эта история про одного человека",
    },
    contentFiles: {
      ru: "lib/blog/posts/eta-istoriya-pro-odnogo-cheloveka/ru.md",
      en: "lib/blog/posts/eta-istoriya-pro-odnogo-cheloveka/en.md",
      de: "lib/blog/posts/eta-istoriya-pro-odnogo-cheloveka/de.md",
      fi: "lib/blog/posts/eta-istoriya-pro-odnogo-cheloveka/fi.md",
      cn: "lib/blog/posts/eta-istoriya-pro-odnogo-cheloveka/cn.md",
    },
  },
];
