# @det/seo

Утилиты для сборки `Metadata` (Next.js) с Open Graph/Twitter данными для превью ссылок.

## Переменные окружения

- `NEXT_PUBLIC_SITE_URL` — базовый URL сайта, используется для сборки абсолютных ссылок.
  - Если переменная отсутствует или содержит невалидный URL, билдер вернёт только `title`/`description` и не будет задавать `metadataBase` или абсолютные URL.

## Пример

```ts
import { buildOpenGraphMetadata } from "@det/seo";

export const metadata = buildOpenGraphMetadata({
  title: "Моя публикация",
  description: "Короткое описание статьи",
  urlPath: "/blog/my-post",
  coverImageSrc: "/images/posts/my-post.webp",
  type: "article",
  publishedTime: "2024-03-22T12:00:00Z",
  authors: [{ name: "Иван Иванов", url: "https://example.com/team/ivan" }],
  locale: "ru_RU",
});
```
