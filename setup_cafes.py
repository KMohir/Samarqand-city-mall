#!/usr/bin/env python
"""
Скрипт для создания категории кафе и ресторанов
"""
import os
import sys
import django

# Настройка Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'samarkand_mall.settings')
sys.path.append('/home/mohirbek/Projects/Samarqand-city-mall')

try:
    django.setup()
    
    from core.models import Category, Tenant
    from django.utils.text import slugify
    
    print("🍽️ Настройка категории 'Кафе и Рестораны'...")
    
    # Создаем категорию
    cafes_category, created = Category.objects.get_or_create(
        slug='cafes',
        defaults={'name': 'Кафе и Рестораны'}
    )
    
    if created:
        print(f"✅ Создана категория: {cafes_category.name}")
    else:
        print(f"ℹ️  Категория существует: {cafes_category.name}")
    
    # Данные кафе и ресторанов
    cafes_data = [
        {
            'name': 'Starbucks',
            'floor': '1 этаж',
            'description': 'Starbucks - крупнейшая сеть кофеен в мире. Отличный кофе и уютная атмосфера.',
            'operating_hours': 'Пн-Вс: 08:00-23:00',
            'has_delivery': True,
        },
        {
            'name': 'KFC',
            'floor': '3 этаж',
            'description': 'KFC - знаменитая сеть ресторанов быстрого питания. Легендарная курочка и бургеры.',
            'operating_hours': 'Пн-Вс: 10:00-23:00',
            'has_delivery': True,
            'has_promotions': True,
        },
        {
            'name': 'Pizza Mia',
            'floor': '3 этаж',
            'description': 'Pizza Mia - итальянская пиццерия с аутентичными рецептами. Настоящий вкус Италии.',
            'operating_hours': 'Пн-Чт: 11:00-23:00, Пт-Вс: 11:00-00:00',
            'has_delivery': True,
            'has_promotions': True,
        },
        {
            'name': 'Sushi Bar',
            'floor': '3 этаж',
            'description': 'Sushi Bar - свежие роллы и суши каждый день. Японская кухня в лучшем исполнении.',
            'operating_hours': 'Пн-Вс: 11:00-23:00',
            'has_delivery': True,
        },
        {
            'name': 'Coffee House',
            'floor': '2 этаж',
            'description': 'Coffee House - уютная кофейня с авторским кофе и десертами. Идеальное место для встреч.',
            'operating_hours': 'Пн-Вс: 08:00-22:00',
            'has_delivery': False,
        },
        {
            'name': 'Burger King',
            'floor': '3 этаж',
            'description': 'Burger King - американская сеть ресторанов быстрого питания. Вкусные бургеры и картошка фри.',
            'operating_hours': 'Пн-Вс: 10:00-23:00',
            'has_delivery': True,
            'has_promotions': True,
        },
        {
            'name': 'Subway',
            'floor': '2 этаж',
            'description': 'Subway - свежие сэндвичи и салаты. Сделай свой идеальный сэндвич!',
            'operating_hours': 'Пн-Вс: 08:00-22:00',
            'has_delivery': True,
        },
        {
            'name': 'McDonald\'s',
            'floor': '3 этаж',
            'description': 'McDonald\'s - всемирно известная сеть ресторанов быстрого питания.',
            'operating_hours': 'Пн-Вс: 07:00-23:00',
            'has_delivery': True,
            'has_promotions': True,
        }
    ]
    
    created_count = 0
    
    for cafe_data in cafes_data:
        tenant, created = Tenant.objects.get_or_create(
            name=cafe_data['name'],
            category=cafes_category,
            defaults={
                'slug': slugify(cafe_data['name']),
                'floor': cafe_data['floor'],
                'description': cafe_data['description'],
                'operating_hours': cafe_data['operating_hours'],
                'has_delivery': cafe_data.get('has_delivery', False),
                'has_promotions': cafe_data.get('has_promotions', False),
            }
        )
        
        if created:
            print(f"✅ Создан: {tenant.name}")
            created_count += 1
        else:
            print(f"ℹ️  Существует: {tenant.name}")
    
    # Финальная статистика
    total_cafes = Tenant.objects.filter(category=cafes_category).count()
    
    print(f"\n📊 Результат:")
    print(f"   Создано новых: {created_count}")
    print(f"   Всего кафе в категории: {total_cafes}")
    print(f"   Категория: {cafes_category.name} (slug: {cafes_category.slug})")
    
    if total_cafes > 0:
        print(f"\n✅ Готово! Теперь /catalog/cafes/ должен работать.")
        print(f"   Список кафе:")
        for cafe in Tenant.objects.filter(category=cafes_category):
            print(f"   - {cafe.name}")
    else:
        print(f"\n❌ Проблема: в категории нет кафе!")
        
except Exception as e:
    print(f"❌ Ошибка: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
