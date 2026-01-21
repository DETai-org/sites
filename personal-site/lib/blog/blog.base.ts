import { BlogPostBase } from "./types";

export const baseBlogPosts: BlogPostBase[] = [
  {
    postId: "eta-istoriya-pro-odnogo-cheloveka",
    publishedAt: "2016-05-16T10:08:00+03:00",
    author: "Anton Kolhonen",
    status: "publish",
    rubric: { slug: "rubric:orientation-toward-overcoming" },
    category: { slug: "category:overcoming" },
    keywords: [{ slug: "keyword:existential-choice" }],
    keywordsRaw: ["успех", "преодоление", "мотивация"],
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
  {
    postId: "sila-i-svet-haus-i-mrak",
    publishedAt: "2016-06-23T12:10:00+03:00",
    author: "Anton Kolhonen",
    status: "publish",
    rubric: { slug: "rubric:shadow-and-light" },
    category: { slug: "category:psychology" },
    keywords: [],
    keywordsRaw: [],
    coverImage: {
      src: "/images/posts/sila-i-svet-haus-i-mrak.jpg",
      width: 450,
      height: 454,
      alt: "Сила и свет, хаус и мрак",
    },
    contentFiles: {
      ru: "lib/blog/posts/sila-i-svet-haus-i-mrak/ru.md",
      en: "lib/blog/posts/sila-i-svet-haus-i-mrak/en.md",
      de: "lib/blog/posts/sila-i-svet-haus-i-mrak/de.md",
      fi: "lib/blog/posts/sila-i-svet-haus-i-mrak/fi.md",
      cn: "lib/blog/posts/sila-i-svet-haus-i-mrak/cn.md",
    },
  },
];
