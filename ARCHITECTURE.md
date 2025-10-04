# Архитектура проекта Samarkand City Mall

## 🏗️ Общая архитектура

```
┌─────────────────────────────────────────────────────────────────┐
│                     КЛИЕНТ (Браузер)                             │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                │
│  │   HTML     │  │    CSS     │  │ JavaScript │                │
│  │ Templates  │  │  main.css  │  │   app.js   │                │
│  └────────────┘  └────────────┘  └────────────┘                │
└─────────────────────────────────────────────────────────────────┘
                            ↕ HTTP/HTTPS
┌─────────────────────────────────────────────────────────────────┐
│                   WEB СЕРВЕР (Nginx/Apache)                      │
│                   - Статические файлы                            │
│                   - Медиа файлы                                  │
│                   - Proxy к Django                               │
└─────────────────────────────────────────────────────────────────┘
                            ↕ Gunicorn
┌─────────────────────────────────────────────────────────────────┐
│                   DJANGO APPLICATION                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                      URLS (Маршрутизация)                 │  │
│  │  / → HomePageView                                         │  │
│  │  /catalog/<slug>/ → CatalogListView                       │  │
│  │  /tenant/<slug>/ → TenantDetailView                       │  │
│  │  /news/ → NewsListView                                    │  │
│  │  /search/ → SearchView                                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ↕                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  VIEWS (Представления)                    │  │
│  │  • HomePageView - главная страница                        │  │
│  │  • CatalogListView - каталог с фильтрацией               │  │
│  │  • TenantDetailView - детальная страница                 │  │
│  │  • NewsListView - список новостей                         │  │
│  │  • NewsDetailView - детальная новость                     │  │
│  │  • SearchView - поиск                                     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ↕                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  MODELS (Модели данных)                   │  │
│  │  • Category - категории                                   │  │
│  │  • Brand - бренды                                         │  │
│  │  • Tenant - арендаторы (магазины/рестораны)              │  │
│  │  • NewsArticle - новости                                  │  │
│  │  • Service - услуги                                       │  │
│  │  • Vacancy - вакансии                                     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ↕                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                 TEMPLATES (Шаблоны)                       │  │
│  │  • base.html - базовый шаблон                            │  │
│  │  • home.html - главная страница                          │  │
│  │  • catalog_list.html - каталог                           │  │
│  │  • tenant_detail.html - детальная страница               │  │
│  │  • news_list.html - список новостей                      │  │
│  │  • search_results.html - результаты поиска               │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                            ↕ ORM
┌─────────────────────────────────────────────────────────────────┐
│              БАЗА ДАННЫХ (SQLite/PostgreSQL)                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │categories│  │  brands  │  │ tenants  │  │   news   │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Поток данных

### 1. Запрос к главной странице

```
Пользователь → http://site.com/
    ↓
Nginx получает запрос
    ↓
Nginx передает в Gunicorn
    ↓
Django обрабатывает URL: / → HomePageView
    ↓
HomePageView.get_context_data()
    ↓
ORM запрос: Brand.objects.all()
    ↓
БД возвращает список брендов
    ↓
Рендеринг шаблона home.html с контекстом
    ↓
HTML → Nginx → Клиент
```

### 2. Запрос к каталогу с фильтрами

```
Пользователь → http://site.com/catalog/shops/?has_promotions=true&sort=az
    ↓
Nginx → Gunicorn → Django
    ↓
URL: /catalog/<slug>/ → CatalogListView
    ↓
CatalogListView.get_queryset()
    ↓
Фильтрация:
  - Tenant.objects.filter(category__slug='shops')
  - .filter(has_promotions=True)
  - .order_by('name')
    ↓
БД возвращает отфильтрованный список
    ↓
Рендеринг catalog_list.html с:
  - tenants (QuerySet)
  - active_filters (dict)
  - current_category (Category)
    ↓
HTML → Nginx → Клиент
```

### 3. Запрос к поиску

```
Пользователь → http://site.com/search/?q=zara
    ↓
Nginx → Gunicorn → Django
    ↓
URL: /search/ → SearchView
    ↓
SearchView.get_queryset()
    ↓
ORM запрос с Q объектами:
  Tenant.objects.filter(
    Q(name__icontains='zara') |
    Q(description__icontains='zara')
  )
    ↓
БД возвращает результаты
    ↓
Рендеринг search_results.html
    ↓
HTML → Nginx → Клиент
```

## 🗂️ Структура модели данных

```
┌────────────────┐
│   Category     │
│ ─────────────  │         ┌────────────────┐
│ id             │◄────┐   │     Brand      │
│ name           │     │   │ ─────────────  │
│ slug           │     │   │ id             │
│ icon           │     │   │ name           │
└────────────────┘     │   │ logo           │
                       │   └────────────────┘
                       │            ▲
                       │            │
┌──────────────────────┼────────────┘
│                      │
│   ┌──────────────────▼──────────────────┐
│   │            Tenant                   │
│   │ ──────────────────────────────────  │
│   │ id                                  │
│   │ name, slug                          │
│   │ category_id (FK → Category)         │
│   │ brand_id (FK → Brand)               │
│   │ logo, cover_image                   │
│   │ description                         │
│   │ floor, location_on_map              │
│   │ phone_number, website_url           │
│   │ operating_hours                     │
│   │ has_promotions                      │
│   │ has_loyalty_program                 │
│   │ is_temporarily_closed               │
│   │ has_delivery                        │
│   │ has_business_lunch                  │
│   │ created_at, updated_at              │
│   └─────────────────────────────────────┘
│
└────────────────────────────────────────────

┌────────────────┐    ┌────────────────┐    ┌────────────────┐
│  NewsArticle   │    │    Service     │    │    Vacancy     │
│ ─────────────  │    │ ─────────────  │    │ ─────────────  │
│ id             │    │ id             │    │ id             │
│ title, slug    │    │ title          │    │ title          │
│ image          │    │ description    │    │ description    │
│ content        │    │ icon           │    │ requirements   │
│ published_date │    └────────────────┘    │ is_active      │
└────────────────┘                          │ published_date │
                                            └────────────────┘
```

## 🎨 Frontend архитектура

```
┌──────────────────────────────────────────────────────────┐
│                    BASE.HTML                              │
│  ┌────────────────────────────────────────────────────┐  │
│  │              HEADER (includes/header.html)         │  │
│  │  ┌──────────────┐  ┌──────────────────────────┐   │  │
│  │  │ Top Info Bar │  │ Main Navigation          │   │  │
│  │  │ - Время      │  │ - Logo                   │   │  │
│  │  │ - Контакты   │  │ - Категории (динамично) │   │  │
│  │  │ - Поиск      │  │ - Мобильное меню         │   │  │
│  │  └──────────────┘  └──────────────────────────┘   │  │
│  └────────────────────────────────────────────────────┘  │
│                                                           │
│  ┌────────────────────────────────────────────────────┐  │
│  │              MAIN CONTENT (блок content)           │  │
│  │  Наследуется в:                                    │  │
│  │  - home.html                                       │  │
│  │  - catalog_list.html                               │  │
│  │  - tenant_detail.html                              │  │
│  │  - news_list.html                                  │  │
│  │  - search_results.html                             │  │
│  └────────────────────────────────────────────────────┘  │
│                                                           │
│  ┌────────────────────────────────────────────────────┐  │
│  │              FOOTER (includes/footer.html)         │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────┐     │  │
│  │  │  Ссылки  │  │ Контакты │  │ Соц. сети    │     │  │
│  │  └──────────┘  └──────────┘  └──────────────┘     │  │
│  │                    Copyright                        │  │
│  └────────────────────────────────────────────────────┘  │
│                                                           │
│  ┌────────────────────────────────────────────────────┐  │
│  │                   STATIC FILES                      │  │
│  │  • main.css (стили)                                │  │
│  │  • app.js (JavaScript)                             │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

## 🔐 Административная панель

```
┌─────────────────────────────────────────────────────┐
│          Django Admin (/admin/)                      │
│                                                      │
│  ┌────────────────────────────────────────────────┐ │
│  │          AUTHENTICATION                         │ │
│  │  Username: admin                                │ │
│  │  Password: ********                             │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
│  ┌────────────────────────────────────────────────┐ │
│  │          MODELS MANAGEMENT                      │ │
│  │                                                 │ │
│  │  CORE                                          │ │
│  │  ├─ Categories                                 │ │
│  │  │  └─ Список, фильтры, поиск                 │ │
│  │  ├─ Brands                                     │ │
│  │  │  └─ Список, предпросмотр логотипов         │ │
│  │  ├─ Tenants                                    │ │
│  │  │  └─ Расширенные фильтры, группировка       │ │
│  │  ├─ News Articles                              │ │
│  │  │  └─ Иерархия по датам                      │ │
│  │  ├─ Services                                   │ │
│  │  └─ Vacancies                                  │ │
│  │     └─ Фильтр по активности                   │ │
│  └────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

## 🎯 JavaScript функциональность

```
app.js
│
├─ Мобильное меню
│  └─ Открытие/закрытие, анимация
│
├─ Переключение вида каталога
│  └─ Сетка ↔ Список
│
├─ Плавная прокрутка
│  └─ Якорные ссылки
│
├─ Ленивая загрузка изображений
│  └─ IntersectionObserver API
│
├─ Анимации появления
│  └─ Fade-in при скролле
│
├─ Кнопка "Вверх"
│  └─ Smooth scroll to top
│
└─ Утилиты
   ├─ debounce()
   ├─ throttle()
   └─ showToast()
```

## 📊 CSS архитектура

```
main.css
│
├─ Базовые стили и переменные
│  ├─ :root (CSS переменные)
│  ├─ * (Reset)
│  └─ body, a, .container
│
├─ Header
│  ├─ .header-top
│  ├─ .header-main
│  ├─ .logo
│  └─ .main-nav
│
├─ Footer
│  ├─ .footer-content
│  ├─ .footer-links
│  └─ .footer-social
│
├─ Компоненты
│  ├─ Hero секция
│  ├─ Секции (about, brands, categories)
│  ├─ Карточки (brand-item, tenant-card)
│  ├─ Фильтры (filters-sidebar)
│  └─ Формы (search-form)
│
├─ Страницы
│  ├─ Главная (home)
│  ├─ Каталог (catalog)
│  ├─ Детальные (tenant-detail, news-detail)
│  └─ Поиск (search-results)
│
└─ Адаптивность
   ├─ @media (max-width: 1024px)
   ├─ @media (max-width: 768px)
   └─ @media (max-width: 480px)
```

## 🔄 Жизненный цикл запроса

### Class-Based View (CBV) жизненный цикл

```
HTTP Request
    ↓
urls.py (URL dispatch)
    ↓
View.as_view() (class method)
    ↓
View.dispatch()
    ↓
View.get() или View.post()
    ↓
View.get_queryset() (для ListView/DetailView)
    ↓
View.get_context_data()
    ↓
Render template
    ↓
HTTP Response
```

### Пример: CatalogListView

```python
CatalogListView(ListView)
    ↓
1. dispatch() - определяет метод (GET/POST)
    ↓
2. get_queryset() - получает и фильтрует данные
    ├─ Фильтр по категории (slug из URL)
    ├─ Фильтры из GET параметров
    │   ├─ has_promotions
    │   ├─ has_loyalty_program
    │   └─ has_delivery
    └─ Сортировка (az/za)
    ↓
3. get_context_data() - добавляет в контекст
    ├─ tenants (QuerySet)
    ├─ current_category
    ├─ active_filters
    └─ current_sort
    ↓
4. render_to_response() - рендерит шаблон
    ↓
catalog_list.html → HTML Response
```

## 🎨 Цветовая схема

```
Темная тема:
├─ --color-bg-primary: #111111     ███ Основной фон
├─ --color-bg-secondary: #1a1a1a   ███ Карточки, панели
└─ --color-bg-tertiary: #222222    ███ Элементы

Текст:
├─ --color-text-primary: #FFFFFF   ███ Основной текст
├─ --color-text-secondary: #F5F5F5 ███ Вторичный текст
└─ --color-text-muted: #999999     ███ Приглушенный

Акценты:
├─ --color-accent: #FFD700         ███ Золотой (логотип, кнопки)
└─ --color-accent-hover: #FFC700   ███ При наведении

Границы:
└─ --color-border: #333333         ███ Разделители
```

## 📈 Масштабируемость

### Горизонтальное масштабирование

```
          ┌─────────────┐
          │ Load Balancer│
          └─────────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
┌───▼───┐   ┌───▼───┐   ┌───▼───┐
│Server1│   │Server2│   │Server3│
└───┬───┘   └───┬───┘   └───┬───┘
    │            │            │
    └────────────┼────────────┘
                 │
        ┌────────▼────────┐
        │   PostgreSQL    │
        │   (Master-Slave)│
        └─────────────────┘
```

### Вертикальное масштабирование

- Увеличение ресурсов сервера
- Оптимизация запросов к БД
- Кэширование с Redis
- CDN для статики

---

**Архитектура готова к расширению и масштабированию!** 🚀

