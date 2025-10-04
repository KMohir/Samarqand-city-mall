#!/bin/bash

# Скрипт для быстрой установки и настройки проекта Samarkand City Mall

echo "=============================================="
echo "  Установка Samarkand City Mall"
echo "=============================================="
echo ""

# Проверка версии Python
echo "Проверка версии Python..."
python3 --version

# Создание виртуального окружения
echo ""
echo "Создание виртуального окружения..."
python3 -m venv venv

# Активация виртуального окружения
echo ""
echo "Активация виртуального окружения..."
source venv/bin/activate

# Обновление pip
echo ""
echo "Обновление pip..."
pip install --upgrade pip

# Установка зависимостей
echo ""
echo "Установка зависимостей из requirements.txt..."
pip install -r requirements.txt

# Создание директорий для медиа
echo ""
echo "Создание директорий для медиа-файлов..."
mkdir -p media/brands
mkdir -p media/tenants/logos
mkdir -p media/tenants/covers
mkdir -p media/news
mkdir -p media/categories
mkdir -p media/services
mkdir -p static/images

# Применение миграций
echo ""
echo "Применение миграций базы данных..."
python manage.py makemigrations
python manage.py migrate

# Создание суперпользователя
echo ""
echo "=============================================="
echo "  Создание суперпользователя"
echo "=============================================="
echo ""
echo "Введите данные для администратора:"
python manage.py createsuperuser

# Заполнение тестовыми данными
echo ""
echo "Заполнение базы данных тестовыми данными..."
python manage.py seed_data

# Финальное сообщение
echo ""
echo "=============================================="
echo "  Установка завершена!"
echo "=============================================="
echo ""
echo "Для запуска сервера выполните:"
echo "  source venv/bin/activate"
echo "  python manage.py runserver"
echo ""
echo "Сайт будет доступен по адресу:"
echo "  http://127.0.0.1:8000/"
echo ""
echo "Админ-панель:"
echo "  http://127.0.0.1:8000/admin/"
echo ""
echo "Приятной работы! 🎉"
echo ""

