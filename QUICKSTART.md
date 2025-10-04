# Быстрый старт

## Автоматическая установка (Рекомендуется)

```bash
cd /home/mohirbek/Projects/Samarqand_city_mall
./setup.sh
```

Скрипт автоматически:
1. Создаст виртуальное окружение
2. Установит все зависимости
3. Применит миграции
4. Запросит создание суперпользователя
5. Заполнит базу тестовыми данными

## Ручная установка

### 1. Создание виртуального окружения

```bash
cd /home/mohirbek/Projects/Samarqand_city_mall
python3 -m venv venv
source venv/bin/activate
```

### 2. Установка зависимостей

```bash
pip install -r requirements.txt
```

### 3. Применение миграций

```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Создание суперпользователя

```bash
python manage.py createsuperuser
```

### 5. Заполнение тестовыми данными

```bash
python manage.py seed_data
```

### 6. Запуск сервера

```bash
python manage.py runserver
```

## Доступ к сайту

- **Главная страница**: http://127.0.0.1:8000/
- **Админ-панель**: http://127.0.0.1:8000/admin/

## Основные URL

- `/` - Главная страница
- `/catalog/shops/` - Каталог магазинов
- `/catalog/cafes-restaurants/` - Каталог кафе и ресторанов
- `/catalog/entertainment/` - Развлечения
- `/news/` - Новости
- `/search/` - Поиск

## Структура данных после seed_data

- ✅ 4 категории
- ✅ 10 брендов (ZARA, BOSS, LACOSTE, и др.)
- ✅ 18 арендаторов
- ✅ 3 новости
- ✅ 5 услуг
- ✅ 2 вакансии

## Возможные проблемы

### Ошибка при миграциях

```bash
python manage.py makemigrations --empty core
python manage.py migrate
```

### Проблемы с Pillow

```bash
pip install --upgrade Pillow
```

### База данных заблокирована

```bash
# Остановите сервер (Ctrl+C) и попробуйте снова
```

## Полезные команды

```bash
# Просмотр всех URL маршрутов
python manage.py show_urls

# Создание резервной копии базы данных
cp db.sqlite3 db.sqlite3.backup

# Очистка базы данных
rm db.sqlite3
python manage.py migrate
python manage.py seed_data
```

---

**Готово! Приятной работы!** 🚀

