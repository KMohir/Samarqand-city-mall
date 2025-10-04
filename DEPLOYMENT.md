# Развертывание на продакшене

Инструкции по развертыванию проекта Samarkand City Mall на производственном сервере.

## 🔧 Подготовка к продакшену

### 1. Обновление settings.py

Создайте файл `samarkand_mall/settings_production.py`:

```python
from .settings import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['your-domain.com', 'www.your-domain.com']

# Database - PostgreSQL для продакшена
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'samarkand_mall_db',
        'USER': 'your_db_user',
        'PASSWORD': 'your_db_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# Security settings
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

# Static files
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.ManifestStaticFilesStorage'

# Media files
MEDIA_ROOT = BASE_DIR / 'media'

# Email configuration (для отправки писем)
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your-email@gmail.com'
EMAIL_HOST_PASSWORD = 'your-email-password'
```

### 2. Установка PostgreSQL

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo -u postgres psql

# В PostgreSQL консоли:
CREATE DATABASE samarkand_mall_db;
CREATE USER your_db_user WITH PASSWORD 'your_db_password';
ALTER ROLE your_db_user SET client_encoding TO 'utf8';
ALTER ROLE your_db_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE your_db_user SET timezone TO 'Asia/Samarkand';
GRANT ALL PRIVILEGES ON DATABASE samarkand_mall_db TO your_db_user;
\q
```

### 3. Обновление requirements.txt

Добавьте в `requirements.txt`:

```
Django>=5.0
Pillow>=10.0
psycopg2-binary>=2.9
gunicorn>=21.0
whitenoise>=6.0
```

## 🚀 Развертывание с Gunicorn + Nginx

### 1. Установка зависимостей

```bash
cd /var/www/samarkand_mall
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 2. Применение миграций

```bash
export DJANGO_SETTINGS_MODULE=samarkand_mall.settings_production
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser
python manage.py seed_data
```

### 3. Настройка Gunicorn

Создайте файл `gunicorn_config.py`:

```python
bind = '127.0.0.1:8000'
workers = 3
worker_class = 'sync'
timeout = 120
keepalive = 5
errorlog = '/var/log/gunicorn/error.log'
accesslog = '/var/log/gunicorn/access.log'
```

Создайте systemd service файл `/etc/systemd/system/samarkand_mall.service`:

```ini
[Unit]
Description=Samarkand City Mall Django Application
After=network.target

[Service]
Type=notify
User=www-data
Group=www-data
WorkingDirectory=/var/www/samarkand_mall
Environment="PATH=/var/www/samarkand_mall/venv/bin"
Environment="DJANGO_SETTINGS_MODULE=samarkand_mall.settings_production"
ExecStart=/var/www/samarkand_mall/venv/bin/gunicorn \
    --config /var/www/samarkand_mall/gunicorn_config.py \
    samarkand_mall.wsgi:application

[Install]
WantedBy=multi-user.target
```

Запуск службы:

```bash
sudo systemctl daemon-reload
sudo systemctl start samarkand_mall
sudo systemctl enable samarkand_mall
sudo systemctl status samarkand_mall
```

### 4. Настройка Nginx

Создайте файл `/etc/nginx/sites-available/samarkand_mall`:

```nginx
upstream samarkand_mall {
    server 127.0.0.1:8000;
}

server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Редирект на HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL сертификаты (получить через Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # Заголовки безопасности
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Статические файлы
    location /static/ {
        alias /var/www/samarkand_mall/staticfiles/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Медиа файлы
    location /media/ {
        alias /var/www/samarkand_mall/media/;
        expires 7d;
        add_header Cache-Control "public";
    }

    # Proxy к Django приложению
    location / {
        proxy_pass http://samarkand_mall;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
    }
}
```

Активация конфигурации:

```bash
sudo ln -s /etc/nginx/sites-available/samarkand_mall /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 5. Получение SSL сертификата (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 🔒 Безопасность

### 1. Настройка файрвола (UFW)

```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
sudo ufw status
```

### 2. Регулярные обновления

```bash
# Автоматические обновления безопасности
sudo apt install unattended-upgrades
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

### 3. Резервное копирование

Создайте скрипт `/var/www/samarkand_mall/backup.sh`:

```bash
#!/bin/bash

# Директории
BACKUP_DIR="/var/backups/samarkand_mall"
DATE=$(date +%Y%m%d_%H%M%S)

# Создание директории для бэкапов
mkdir -p $BACKUP_DIR

# Бэкап базы данных
pg_dump -U your_db_user samarkand_mall_db > $BACKUP_DIR/db_$DATE.sql

# Бэкап медиа файлов
tar -czf $BACKUP_DIR/media_$DATE.tar.gz /var/www/samarkand_mall/media/

# Удаление старых бэкапов (старше 30 дней)
find $BACKUP_DIR -name "*.sql" -mtime +30 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete

echo "Backup completed: $DATE"
```

Добавьте в crontab:

```bash
# Ежедневный бэкап в 3:00
0 3 * * * /var/www/samarkand_mall/backup.sh >> /var/log/backup.log 2>&1
```

## 📊 Мониторинг

### 1. Логи приложения

```bash
# Логи Django
tail -f /var/log/gunicorn/error.log
tail -f /var/log/gunicorn/access.log

# Логи Nginx
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log
```

### 2. Мониторинг ресурсов

Установите htop:

```bash
sudo apt install htop
htop
```

### 3. Проверка статуса служб

```bash
sudo systemctl status samarkand_mall
sudo systemctl status nginx
sudo systemctl status postgresql
```

## 🔄 Обновление приложения

Создайте скрипт `/var/www/samarkand_mall/deploy.sh`:

```bash
#!/bin/bash

cd /var/www/samarkand_mall

# Активация виртуального окружения
source venv/bin/activate

# Получение последних изменений
git pull origin main

# Установка зависимостей
pip install -r requirements.txt

# Применение миграций
export DJANGO_SETTINGS_MODULE=samarkand_mall.settings_production
python manage.py migrate

# Сбор статических файлов
python manage.py collectstatic --noinput

# Перезапуск Gunicorn
sudo systemctl restart samarkand_mall

echo "Deployment completed!"
```

Сделайте его исполняемым:

```bash
chmod +x /var/www/samarkand_mall/deploy.sh
```

## 🌐 Дополнительные настройки

### 1. CDN для статических файлов

Рассмотрите использование CDN (например, Cloudflare) для ускорения загрузки статических файлов.

### 2. Кэширование

Установите Redis для кэширования:

```bash
sudo apt install redis-server
pip install django-redis
```

Добавьте в settings_production.py:

```python
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}
```

### 3. Мониторинг производительности

Используйте инструменты:
- **Sentry** - для отслеживания ошибок
- **New Relic** - для мониторинга производительности
- **Google Analytics** - для аналитики посетителей

## ✅ Чек-лист развертывания

- [ ] DEBUG = False в продакшене
- [ ] Настроен ALLOWED_HOSTS
- [ ] Установлен PostgreSQL
- [ ] Применены миграции
- [ ] Создан суперпользователь
- [ ] Собраны статические файлы
- [ ] Настроен Gunicorn
- [ ] Настроен Nginx
- [ ] Получен SSL сертификат
- [ ] Настроен файрвол
- [ ] Настроено резервное копирование
- [ ] Протестирован сайт
- [ ] Настроен мониторинг

---

**Успешного развертывания!** 🚀

