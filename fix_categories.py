#!/usr/bin/env python
"""
Скрипт для исправления категорий в базе данных
"""
import os
import sys
import django

# Добавляем путь к проекту
sys.path.append('/home/mohirbek/Projects/Samarqand-city-mall')

# Настройка Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'samarkand_mall.settings')

try:
    django.setup()
    from core.models import Category
    
    print("🔧 Исправление категорий...")
    
    # Создаем или обновляем категории
    categories_data = [
        {'name': 'Магазины', 'slug': 'shops'},
        {'name': 'Кафе и Рестораны', 'slug': 'cafes'},
        {'name': 'Развлечения', 'slug': 'entertainment'},
        {'name': 'Услуги', 'slug': 'services'},
    ]
    
    created_count = 0
    updated_count = 0
    
    for cat_data in categories_data:
        category, created = Category.objects.get_or_create(
            slug=cat_data['slug'],
            defaults={'name': cat_data['name']}
        )
        
        if created:
            print(f"✅ Создана категория: {category.name} (slug: {category.slug})")
            created_count += 1
        else:
            # Обновляем название если оно изменилось
            if category.name != cat_data['name']:
                category.name = cat_data['name']
                category.save()
                print(f"🔄 Обновлена категория: {category.name} (slug: {category.slug})")
                updated_count += 1
            else:
                print(f"ℹ️  Категория уже существует: {category.name} (slug: {category.slug})")
    
    print(f"\n📊 Результат:")
    print(f"   Создано новых: {created_count}")
    print(f"   Обновлено: {updated_count}")
    print(f"   Всего категорий: {Category.objects.count()}")
    
    # Проверяем, что все нужные категории существуют
    required_slugs = ['shops', 'cafes', 'entertainment', 'services']
    existing_slugs = list(Category.objects.values_list('slug', flat=True))
    
    missing_slugs = [slug for slug in required_slugs if slug not in existing_slugs]
    if missing_slugs:
        print(f"⚠️  Отсутствующие категории: {missing_slugs}")
    else:
        print("✅ Все необходимые категории присутствуют!")
        
except Exception as e:
    print(f"❌ Ошибка: {e}")
    sys.exit(1)
