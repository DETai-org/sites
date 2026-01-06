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
- Общие devDependencies (eslint/typescript/tailwind и типы) вынесены в корневой `package.json` и используются всеми сайтами.
- Для `personal-site` TypeScript и типы продублированы в `dependencies`, чтобы сборка проходила при production install на Vercel.
- Оба сайта складывают `distDir` в корневой `.next`, чтобы сборки корректно подхватывались при монорепозиторной конфигурации Vercel.

## Vercel

### detai-site

- **Root Directory**: `/`
- **Install Command**: `npm install`
- **Build Command**: `npm --workspace detai-site run build`

### personal-site

- **Root Directory**: `/`
- **Install Command**: `npm install`
- **Build Command**: `npm --workspace personal-site run build`
