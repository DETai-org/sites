# Централизованные данные блога DETai

Эта директория хранит схему и контент блога профессионального сайта DETai. Все страницы блога должны брать данные только отсюда, поэтому для добавления нового поста достаточно:

1. создать папку поста в `lib/blog/posts/<postId>/` и добавить Markdown-файлы переводов (`ru.md`, `en.md` и т.д.);
2. добавить запись в [`blog.base.ts`](./blog.base.ts) согласно типам из [`types.ts`](./types.ts), указать `postId` (связка с frontmatter) и заполнить `contentFiles`;
3. подготовить обложку и положить её в `public/images/posts/` (WebP или временный SVG). Если пост публикуется на обоих сайтах, допустимо использовать общую обложку из `personal-site/public/images/posts/` — см. политику в `packages/static-data/policies/post_images_policy.md`.

## Структура файлов

- `blog.base.ts` — базовые метаданные постов, без чтения Markdown.
- `blog.data.ts` — серверная сборка постов с подгрузкой контента.
- `blog.client.ts` — данные для клиентских компонентов.
- `lang.ts` — маппинг языков блога в HTML-валидные BCP47-коды.
- `taxonomy.ts` — тонкий слой, который подтягивает таксономию из `packages/static-data/post_documents`.
- `types.ts` — типы для сущностей блога.
- `posts/` — Markdown-файлы с текстом, сгруппированные по `postId` и языкам.

## Как добавлять новый пост

1. Сохраните текст поста в `lib/blog/posts/<postId>/<lang>.md`.
2. Скопируйте обложку из `wordpress-data/uploads`, оптимизируйте её и положите в `public/images/posts/`.
3. Заполните метаданные в `blog.base.ts`: `postId`, `publishedAt`, `rubric` (одна рубрика на пост), `category` (одна категория на пост), `keywords`, `keywordsRaw`, `coverImage`, `contentFiles`.

[⬅ Вернуться к основному README](../../README.md)
