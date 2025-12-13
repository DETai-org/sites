# components/

Глобальные UI-компоненты проекта: примитивы, блоки страниц и визуальные эффекты, которые переиспользуются на разных маршрутах.

## ui/

Библиотека атомарных элементов (кнопки, поля ввода, карточки, иконки). Используются в любых секциях и страницах.

## layout/

Компоненты каркаса сайта: Header, Footer и обёртки для страниц. Формируют общую навигацию и сетку.

## sections/

Крупные блоки страниц (Hero, Features, Products), собирающие примитивы из `ui/` в готовые секции.

## visual/

Компоненты визуального слоя Hero-сцены: Lottie-анимации, Canvas-эффекты и логика их синхронизации.

### Состав

| Компонент | Файл | Назначение |
|---------|------|-----------|
| Animated logo wrapper | [`AnimatedLogo.tsx`](./visual/AnimatedLogo.tsx) | Переключение Lottie: intro → loop |
| Canvas · Intro FX | [`CanvasParticlesLayer.tsx`](./visual/CanvasParticlesLayer.tsx) | Частицы, втягивание при интро |
| Canvas · Pulse FX | [`Canvas_pulse_light_Layer.tsx`](./visual/Canvas_pulse_light_Layer.tsx) | Подсветка, дыхание пульса |

### Связанные ресурсы

- Lottie-файлы и статические ассеты лежат в [`public/assets`](../public/assets/README.md#animations).
- Canvas-эффекты опираются на анимации из `visual/` и синхронизируются через общий Hero-контейнер.
