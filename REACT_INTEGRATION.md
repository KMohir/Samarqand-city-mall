# Интеграция React компонента с SVG иконками

## Обзор изменений

Все иконки теперь используют SVG файлы из папки `/svg/` вместо библиотеки Lucide Icons. Это обеспечивает единообразный стиль всего сайта.

## Основные изменения

### 1. Компонент SvgIcon

Создан универсальный компонент для отображения SVG иконок:

```jsx
const SvgIcon = ({ src, className = "", size = 24, alt = "" }) => (
  <img 
    src={src} 
    className={className} 
    width={size} 
    height={size} 
    alt={alt}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  />
);
```

### 2. Константы путей к SVG

Все пути к SVG файлам определены в объекте `SVG_ICONS`:

```jsx
const SVG_ICONS = {
  search: '/svg/poisk.svg',         // Поиск
  location: '/svg/locatsa.svg',     // Локация
  clock: '/svg/soat.svg',           // Часы
  phone: '/svg/phone.svg',          // Телефон
  web: '/svg/web.svg',              // Веб
  bag: '/svg/bag.svg',              // Сумка (магазины)
  food: '/svg/food.svg',            // Еда (рестораны)
  popCorn: '/svg/pop corn.svg',     // Попкорн (развлечения)
  service: '/svg/tex usluga.svg',   // Услуги
  menu: '/svg/menu.svg',            // Меню
  logo: '/svg/City Mall logo.svg'   // Логотип
};
```

## Использование иконок

### В Header

```jsx
<SvgIcon src={SVG_ICONS.clock} size={16} className="text-amber-600" alt="Часы" />
<SvgIcon src={SVG_ICONS.location} size={16} className="text-amber-600" alt="Локация" />
<SvgIcon src={SVG_ICONS.search} size={18} alt="Поиск" />
```

### В навигации

```jsx
NAV_ITEMS.map((item) => (
  <SvgIcon src={item.icon} size={16} alt={item.name} />
))
```

### В категориях

```jsx
CATEGORIES.map((category) => (
  <SvgIcon 
    src={category.icon} 
    size={40} 
    className="text-white filter brightness-0 invert" 
    alt={category.title} 
  />
))
```

### В Footer

```jsx
<SvgIcon src={SVG_ICONS.logo} className="w-auto h-12" alt="Logo" />
<SvgIcon src={SVG_ICONS.location} size={14} className="mr-1" alt="Адрес" />
<SvgIcon src={SVG_ICONS.phone} size={14} className="mr-1" alt="Телефон" />
```

## Стилизация иконок

### Изменение цвета

SVG иконки можно стилизовать с помощью CSS классов Tailwind:

```jsx
// Янтарный цвет
<SvgIcon src={SVG_ICONS.clock} className="text-amber-600" />

// Белый цвет с фильтром
<SvgIcon src={SVG_ICONS.bag} className="filter brightness-0 invert" />

// Серый цвет
<SvgIcon src={SVG_ICONS.menu} className="text-gray-700" />
```

### Изменение размера

```jsx
// Маленькая иконка
<SvgIcon src={SVG_ICONS.phone} size={14} />

// Средняя иконка
<SvgIcon src={SVG_ICONS.search} size={24} />

// Большая иконка
<SvgIcon src={SVG_ICONS.logo} size={48} />

// Автоматический размер
<SvgIcon src={SVG_ICONS.logo} className="w-auto h-12" />
```

## Соответствие SVG иконок и категорий

| Категория | SVG файл | Использование |
|-----------|----------|---------------|
| Магазины | `bag.svg` | Иконка сумки для магазинов |
| Кафе и Рестораны | `food.svg` | Иконка еды |
| Развлечения | `pop corn.svg` | Иконка попкорна для кинотеатра |
| Услуги | `tex usluga.svg` | Иконка технических услуг |
| Поиск | `poisk.svg` | Иконка поиска в header |
| Локация | `locatsa.svg` | Адрес и карты |
| Время | `soat.svg` | Часы работы |
| Телефон | `phone.svg` | Контактная информация |
| Меню | `menu.svg` | Мобильное меню |
| Логотип | `City Mall logo.svg` | Главный логотип |

## Цветовая схема

### Акцентные цвета

- **Основной акцент**: `#D1B898` (бежевый)
- **Вторичный акцент**: `#FF6600` (оранжевый) - только для hero баннера
- **Текст акцент**: `text-amber-600` (янтарный)
- **Hover эффект**: `hover:bg-amber-600`

### Примеры использования

```jsx
// Hero Section
backgroundColor: '#D1B898'

// Header иконки
className="text-amber-600"

// Кнопки
className="bg-amber-600 hover:bg-amber-700"

// Категории
className="bg-[#D1B898]"
```

## Адаптивность

Все компоненты адаптированы для разных размеров экранов:

### Брейкпоинты

- **Mobile**: по умолчанию
- **Tablet**: `sm:` (640px)
- **Desktop**: `md:` (768px), `lg:` (1024px)

### Примеры

```jsx
// Размер текста
className="text-6xl sm:text-8xl"

// Высота секции
className="h-[45vh] md:h-[60vh]"

// Сетка
className="grid-cols-2 md:grid-cols-4"

// Скрытие/показ элементов
className="hidden md:flex"
```

## Эффекты и анимации

### Hover эффекты

```jsx
// Масштабирование
className="hover:scale-105"

// Изменение тени
className="shadow-md hover:shadow-xl"

// Изменение цвета
className="hover:text-amber-700"

// Изменение фона
className="hover:bg-gray-100"
```

### Transitions

```jsx
// Все свойства
className="transition-all duration-300"

// Только цвет
className="transition-colors"

// Только тень
className="transition-shadow duration-300"
```

## Текстурные фоны

Все секции используют SVG паттерны для фона:

```jsx
const backgroundStyle = {
    backgroundColor: 'white',
    backgroundImage: 'url("data:image/svg+xml,...")',
    backgroundSize: '40px 40px',
};
```

## Установка и запуск

### 1. Установите зависимости

```bash
npm install react react-dom
```

### 2. Убедитесь, что Tailwind CSS установлен

```bash
npm install -D tailwindcss
```

### 3. Настройте tailwind.config.js

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mall-beige': '#D1B898',
        'mall-orange': '#FF6600',
      },
    },
  },
  plugins: [],
}
```

### 4. Импортируйте App компонент

```jsx
import App from './App';
import './index.css'; // Tailwind CSS

ReactDOM.render(<App />, document.getElementById('root'));
```

## Структура проекта

```
Samarqand-city-mall/
├── svg/                           # SVG иконки
│   ├── City Mall logo.svg
│   ├── bag.svg
│   ├── food.svg
│   ├── pop corn.svg
│   ├── tex usluga.svg
│   ├── poisk.svg
│   ├── locatsa.svg
│   ├── soat.svg
│   ├── phone.svg
│   ├── menu.svg
│   └── web.svg
├── App.jsx                        # Главный React компонент
├── index.css                      # Tailwind CSS
├── index.html                     # HTML файл
└── REACT_INTEGRATION.md          # Эта документация
```

## Особенности реализации

### 1. Универсальность

Компонент `SvgIcon` работает со всеми SVG файлами из папки `/svg/`:

```jsx
<SvgIcon src="/svg/любой_файл.svg" size={24} />
```

### 2. Производительность

- SVG загружаются как статические ресурсы
- Минимальное количество перерисовок
- Ленивая загрузка изображений (можно добавить)

### 3. Доступность

- Все иконки имеют атрибут `alt`
- Семантическая разметка
- ARIA метки для интерактивных элементов

### 4. SEO оптимизация

- Семантические HTML теги
- Оптимизированные изображения
- Правильная структура heading тегов

## Будущие улучшения

1. **Анимации**: Добавить плавные анимации появления элементов при скролле
2. **Ленивая загрузка**: Реализовать lazy loading для изображений
3. **Темная тема**: Добавить поддержку темной темы
4. **i18n**: Интернационализация (русский, узбекский, английский)
5. **PWA**: Превратить в Progressive Web App

## Поддержка

По вопросам интеграции обращайтесь к документации:
- [SVG_INTEGRATION.md](./SVG_INTEGRATION.md) - Django интеграция
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Архитектура проекта
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Деплой приложения

## Лицензия

© 2024 Samarkand City Mall. Все права защищены.
