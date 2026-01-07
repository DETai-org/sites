# Personal Site

Персональный сайт на Next.js. Здесь готовится перенос блога из WordPress и новая структура данных.

## Структура данных блога

- `lib/blog/` — центральное место для метаданных и текста постов.
- `lib/blog/posts/` — Markdown-файлы постов.
- `public/images/posts/` — обложки постов, которые раздаются напрямую из `public/` (бинарные файлы добавляются вручную, без коммита).
- Markdown контент компилируется в безопасный HTML на этапе загрузки постов и сохраняется в поле `contentHtml`.

## Сырьё из WordPress

- `wordpress-data/WordPress.2026-01-06.xml` — экспорт постов.
- `wordpress-data/uploads/` — исходные изображения.

## Sanity Studio

Для управления контентом добавлена отдельная студия в `sanity-studio/`.

### Быстрый старт

1. Перейдите в папку студии: `cd sanity-studio`.
2. Установите зависимости: `npm install`.
3. В `sanity.json` замените `projectId` и, при необходимости, `dataset`.
4. Запустите локально: `npm run dev`.

### Настройка интеграции с сайтом

Сайт читает данные через Sanity API. Для этого задайте переменные окружения в `personal-site`:

```
SANITY_PROJECT_ID=yourProjectId
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
```

Если переменные не заданы, сайт продолжит использовать текущие Markdown-посты из `lib/blog/posts/`.

### Деплой студии на Vercel

На стороне Vercel создайте новый проект из папки `personal-site/sanity-studio` и выполните деплой:

```
vercel --prod
```

URL студии будет выдан Vercel после деплоя — используйте его для доступа к Sanity Studio.

### Автоматическое обновление контента

Чтобы публикации в Sanity автоматически триггерили пересборку сайта на Vercel:

1. Создайте Deploy Hook в настройках проекта Vercel.
2. В Sanity Studio добавьте Webhook, который вызывает этот URL при публикации/обновлении постов.

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
