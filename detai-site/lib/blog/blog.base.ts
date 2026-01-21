import { BlogPostBase } from "./types";

export const baseBlogPosts: BlogPostBase[] = [
  {
    postId: "eta-istoriya-pro-odnogo-cheloveka",
    publishedAt: "2016-05-16T10:08:00+03:00",
    author: "Anton Kolhonen",
    status: "publish",
    rubric: { slug: "rubric:orientation-toward-overcoming" },
    category: { slug: "category:overcoming" },
    keywords: [{ slug: "keyword:inner-tension" }],
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
    postId: "blizost-i-nezavisemost",
    publishedAt: "2016-12-15T09:00:00+03:00",
    author: "Anton Kolhonen",
    status: "publish",
    rubric: { slug: "rubric:det-notes" },
    category: { slug: "category:relationships-ideas" },
    keywords: [{ slug: "keyword:ambivalence" }],
    keywordsRaw: [
      "близость и независимость",
      "продуктивная любовь",
      "уважение в отношениях",
    ],
    coverImage: {
      src: "https://personal-site.vercel.app/images/posts/closeness-vs-independence.webp",
      width: 604,
      height: 404,
      alt: "Близость и независимость в отношениях",
    },
    contentFiles: {
      ru: "lib/blog/posts/blizost-i-nezavisemost/ru.md",
      en: "lib/blog/posts/blizost-i-nezavisemost/en.md",
      de: "lib/blog/posts/blizost-i-nezavisemost/de.md",
      fi: "lib/blog/posts/blizost-i-nezavisemost/fi.md",
      cn: "lib/blog/posts/blizost-i-nezavisemost/cn.md",
    },
  },
];
