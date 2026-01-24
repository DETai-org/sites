# Static Assets

Единый источник статических ассетов для сайтов в монорепозитории.

## Структура

- `public/` — зеркало публичных файлов (как в `public/` сайта).
- `scripts/sync-assets.js` — синхронизация ассетов в `public/` каждого сайта.

## Синхронизация

```bash
npm run sync:static-assets
```

Скрипт копирует содержимое `packages/static-assets/public` в `public/` каждого сайта (detai-site и personal-site).
