# Используем официальный образ Python как базовый
FROM python:3.10-slim

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем файл зависимостей и устанавливаем их.
# Это позволяет Docker кэшировать слой, если requirements.txt не менялся.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем остальную часть кода приложения

# Открываем порт, который использует Django
EXPOSE 8000

# Запускаем миграции базы данных и затем сервер Django.
# Использование '0.0.0.0' важно для доступа к серверу извне контейнера.
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]