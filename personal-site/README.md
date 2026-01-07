# Personal Site

Персональный сайт на Next.js. Здесь готовится перенос блога из WordPress и новая структура данных.

## Структура данных блога

- `lib/blog/` — центральное место для метаданных и текста постов.
- `lib/blog/blog.base.ts` — метаданные постов с ссылкой на исходный файл (`contentFile`).
- `lib/blog/posts/` — исходные Markdown-файлы для удобства (не используются в рантайме).
- `public/images/posts/` — обложки постов, которые раздаются напрямую из `public/` (бинарные файлы добавляются вручную, без коммита).
## Отображение постов

- Страница поста использует шаблон, который разбивает текст на абзацы по пустым строкам.
- Текст поста вручную вставляется в `app/blog/[slug]/page.tsx` (для каждой записи отдельно).

## Сырьё из WordPress

- `wordpress-data/WordPress.2026-01-06.xml` — экспорт постов.
- `wordpress-data/uploads/` — исходные изображения.

## Скрипты миграции

Скрипты находятся в `scripts/` и помогают извлекать посты и оптимизировать изображения.

### Извлечение текста постов

```bash
npx tsx scripts/extract-posts.ts eta-istoriya-pro-odnogo-cheloveka
```

### Оптимизация изображений

```bash
npx tsx scripts/optimize-images.ts \
  wordpress-data/uploads/2023/07/maxresdefault.jpg \
  public/images/posts/eta-istoriya-pro-odnogo-cheloveka.webp
```

> ⚠️ Если используете WebP, после генерации замените `coverImage.src` в `lib/blog/blog.base.ts` и загрузите файл в `public/images/posts/`.

### Черновая проверка списка постов

```bash
npx tsx scripts/migrate-wordpress.ts
```
