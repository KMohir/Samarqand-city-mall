"""
Django management команда для создания базовых категорий.

Использование:
    python manage.py create_categories
"""
from django.core.management.base import BaseCommand
from core.models import Category


class Command(BaseCommand):
    help = 'Создает базовые категории для торгового центра'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Создание базовых категорий...'))
        
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
                self.stdout.write(self.style.SUCCESS(f'  ✓ Создана категория: {category.name} (slug: {category.slug})'))
                created_count += 1
            else:
                self.stdout.write(f'  ℹ️  Категория уже существует: {category.name} (slug: {category.slug})')
        
        self.stdout.write(f'\n📊 Создано новых категорий: {created_count}')
        self.stdout.write(f'📊 Всего категорий в базе: {Category.objects.count()}')
