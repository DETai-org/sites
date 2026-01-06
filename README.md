# Monorepo (Next.js sites)

Этот репозиторий — монорепозиторий с несколькими сайтами на Next.js.
Каждый сайт — отдельное приложение со своими стилями и конфигами.
Схема “1 GitHub repo (monorepo) → 2 папки → 2 Vercel Projects (по одному на сайт)” — нормальная практика, особенно когда:

хочешь единые правила/инструменты (eslint, ts, tailwind, общие конфиги)

есть/будут общие пакеты в packages/*

удобно делать один PR, который может затронуть оба сайта (например, общий компонент/утилита)

Когда monorepo — прям “в точку” ✅

сайты связаны (общий дизайн/компоненты/утилиты)

хочешь единый процесс зависимостей (как вы и сделали: root package-lock.json, workspaces)

будет рост: 2 → 3 → 5 сайтов/приложений, и ты не хочешь плодить репы


## Структура

- `detai-site/` — основной сайт DET
- `personal-site/` — персональный сайт
- `packages/` — общий код/пакеты (опционально)

## Правила monorepo

- `package-lock.json` хранится только в корне репозитория.
- Внутри сайтов lockfile не создаём.
- Зависимости ставим только из корня: `npm install --prefix ..`.
- Общие devDependencies (eslint/typescript/tailwind и типы) вынесены в корневой `package.json` и используются всеми сайтами.
- Для `personal-site` TypeScript и типы продублированы в `dependencies`, чтобы сборка проходила при production install на Vercel.
- Root Directory в Vercel — директория сайта (`detai-site` или `personal-site`).
- `distDir` не переопределяется, у каждого сайта свой локальный `.next`.

## Vercel

### detai-site

- **Root Directory**: `detai-site`
- **Install Command**: `npm install`
- **Build Command**: `npm run build`

### personal-site

- **Root Directory**: `personal-site`
- **Install Command**: `npm install`
- **Build Command**: `npm run build`
