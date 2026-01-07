# Personal Site

Персональный сайт на Next.js. Здесь готовится перенос блога из WordPress и новая структура данных.

## Структура данных блога

- `lib/blog/` — центральное место для метаданных и текста постов.
- `lib/blog/posts/` — Markdown-файлы постов.
- `public/images/posts/` — оптимизированные обложки (WebP) или временные плейсхолдеры.
- Markdown контент компилируется в безопасный HTML на этапе загрузки постов и сохраняется в поле `contentHtml`.

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

> ⚠️ В репозиторий пока не кладём бинарные WebP-файлы из-за ограничений PR. После генерации локально замените `coverImage.src` в `lib/blog/blog.base.ts` на WebP и загрузите файл вручную в нужном окружении.

### Черновая проверка списка постов

```bash
npx tsx scripts/migrate-wordpress.ts
```
