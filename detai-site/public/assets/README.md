# public/assets/

Статические файлы, которые подхватываются напрямую из публичной директории и используются без обработки сборкой.

## animations/

Lottie-анимации логотипа DET для Hero-сцены и вспомогательных эффектов.

### Состав

| Тип | Файл | Использование |
|----|------|--------------|
| Intro | [`logo_intro.json`](./animations/logo_intro.json) | Одноразовое интро |
| Pulse | [`logo_pulse.json`](./animations/logo_pulse.json) | Бесконечный heartbeat |
| Static | [`logo-detai-static.json`](./animations/logo-detai-static.json) | Статичная версия логотипа |
| Vector | [`logo.svg`](./animations/logo.svg) | Векторный исходник логотипа |

### Где используется

- Реакт-обёртка и Canvas-эффекты в [`components/visual`](../../components/README.md#visual).
- Переключение интро/луп-анимаций происходит в [`AnimatedLogo.tsx`](../../components/visual/AnimatedLogo.tsx).
