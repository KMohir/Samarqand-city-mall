#!/usr/bin/env python
"""
Скрипт для создания базовых категорий для Samarkand City Mall
"""
import os
import sys
import django

# Настройка Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'samarkand_mall.settings')
django.setup()

from core.models import Category

def create_categories():
    """Создает базовые категории если их нет"""
    
    categories_data = [
        {'name': 'Магазины', 'slug': 'shops'},
        {'name': 'Кафе и Рестораны', 'slug': 'cafes'},
        {'name': 'Развлечения', 'slug': 'entertainment'},
        {'name': 'Услуги', 'slug': 'services'},
    ]
    
    created_count = 0
    
    for cat_data in categories_data:
        category, created = Category.objects.get_or_create(
            slug=cat_data['slug'],
            defaults={'name': cat_data['name']}
        )
        
        if created:
            print(f"✅ Создана категория: {category.name} (slug: {category.slug})")
            created_count += 1
        else:
            print(f"ℹ️  Категория уже существует: {category.name} (slug: {category.slug})")
    
    print(f"\n📊 Всего создано новых категорий: {created_count}")
    print(f"📊 Всего категорий в базе: {Category.objects.count()}")

if __name__ == '__main__':
    create_categories()
