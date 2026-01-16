import { BlogPostBase } from "./types";

export const baseBlogPosts: BlogPostBase[] = [
  {
    postId: "eta-istoriya-pro-odnogo-cheloveka",
    publishedAt: "2016-05-16T10:08:00+03:00",
    author: "Anton",
    status: "publish",
    originalLink:
      "https://antonkolhonen.com/trenirovki/eta-istoriya-pro-odnogo-cheloveka",
    wordpressId: 3026,
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
    author: "Anton",
    status: "publish",
    originalLink: "https://antonkolhonen.com/psihologiya/sila-i-svet-haus-i-mrak",
    wordpressId: 3043,
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
      ru: "lib/blog/posts/Сила и свет, хаус и мрак/ru.md",
      en: "",
      de: "",
      fi: "",
      cn: "",
    },
  },
];
