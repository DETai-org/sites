import { BlogPostBase } from "./types";

export const baseBlogPosts: BlogPostBase[] = [
  {
    slug: "eta-istoriya-pro-odnogo-cheloveka",
    title: "Эта история про одного человека",
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
      src: "/api/images/posts/eta-istoriya-pro-odnogo-cheloveka",
      width: 1280,
      height: 720,
      alt: "Эта история про одного человека",
    },
    contentFile: "lib/blog/posts/eta-istoriya-pro-odnogo-cheloveka.md",
  },
];
