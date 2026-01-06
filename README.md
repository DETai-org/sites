# Monorepo (Next.js sites)

Этот репозиторий — монорепозиторий с несколькими сайтами на Next.js.
Каждый сайт — отдельное приложение со своими стилями и конфигами.

## Структура

- `detai-site/` — основной сайт DET
- `personal-site/` — персональный сайт
- `packages/` — общий код/пакеты (опционально)

## Правила monorepo

- `package-lock.json` хранится только в корне репозитория.
- Внутри сайтов lockfile не создаём.
- Зависимости ставим только из корня: `npm install`.

## Vercel

### detai-site

- **Root Directory**: `/`
- **Install Command**: `npm install`
- **Build Command**: `npm --workspace detai-site run build`

### personal-site

- **Root Directory**: `/`
- **Install Command**: `npm install`
- **Build Command**: `npm --workspace personal-site run build`
