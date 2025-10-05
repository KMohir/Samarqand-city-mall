# SVG Иконки для Samarkand City Mall

Эта папка содержит все SVG-иконки, используемые в проекте Samarkand City Mall.

## Структура иконок

### 🏪 Иконки категорий
- `shopping-bag.svg` - Магазины
- `utensils.svg` - Кафе и рестораны  
- `film.svg` - Развлечения
- `hand.svg` - Услуги
- `bag.svg` - Альтернативная иконка для магазинов
- `food.svg` - Альтернативная иконка для еды
- `pop corn.svg` - Попкорн (развлечения)
- `tex usluga.svg` - Технические услуги

### 🎯 Основные логотипы
- `samarkand-logo.svg` - Основной логотип Samarkand City Mall
- `City Mall logo.svg` - Альтернативный логотип

### 🏷️ Логотипы брендов
- `nike-logo.svg` - Nike
- `adidas-logo.svg` - Adidas  
- `starbucks-logo.svg` - Starbucks
- `lacoste-logo.svg` - Lacoste

### 🔧 UI иконки
- `search.svg` - Поиск
- `map-pin.svg` - Местоположение
- `clock.svg` - Время/часы
- `phone.svg` - Телефон
- `mail.svg` - Email
- `instagram.svg` - Instagram
- `send.svg` - Отправить/Telegram
- `menu-hamburger.svg` - Меню
- `close.svg` - Закрыть

### 🧭 Навигационные иконки
- `home.svg` - Главная
- `coffee.svg` - Кафе
- `smile.svg` - Развлечения
- `grid.svg` - Сетка
- `briefcase.svg` - Новости
- `user.svg` - Пользователь
- `settings.svg` - Настройки
- `calendar.svg` - Календарь

### ➡️ Стрелки
- `arrow-right.svg` - Стрелка вправо
- `arrow-left.svg` - Стрелка влево
- `arrow-up.svg` - Стрелка вверх
- `arrow-down.svg` - Стрелка вниз

### ❤️ Дополнительные иконки
- `star.svg` - Звезда
- `heart.svg` - Сердце
- `trending-up.svg` - Тренд вверх
- `map.svg` - Карта
- `locatsa.svg` - Локация (альтернативная)
- `poisk.svg` - Поиск (альтернативная)
- `soat.svg` - Часы (альтернативная)
- `web.svg` - Веб

## Использование в HTML

```html
<!-- Прямое использование -->
<img src="svg/shopping-bag.svg" alt="Магазины" width="48" height="48">

<!-- С CSS для стилизации -->
<img src="svg/shopping-bag.svg" class="category-icon">
```

## Использование в Django шаблонах

```html
<!-- С помощью svg_tags -->
{% load svg_tags %}
{% svg_icon "shopping-bag" "category-icon" "48" "48" %}
```

## Цвета и стилизация

Все SVG-иконки используют `stroke="currentColor"` или `fill="currentColor"`, что позволяет легко менять цвет через CSS:

```css
.category-icon {
    color: #D1B898; /* Основной цвет проекта */
    width: 48px;
    height: 48px;
}
```

## Размеры

- **Основные иконки**: 24x24px (стандартный размер)
- **Иконки категорий**: 48x48px (увеличенный размер)
- **Логотипы брендов**: 100x100px или пропорционально
- **Основной логотип**: 25x40px (специальные пропорции)

## Совместимость

Все SVG-иконки созданы с учетом:
- ✅ Совместимости с современными браузерами
- ✅ Адаптивности и масштабируемости
- ✅ Accessibility (доступности)
- ✅ SEO-оптимизации

## Обновления

При добавлении новых иконок:
1. Сохраните файл в папку `svg/`
2. Обновите этот README.md
3. Убедитесь в корректности размеров и цветов
4. Проверьте совместимость с существующими стилями
