# Generated manually for creating cafes data

from django.db import migrations
from django.utils.text import slugify


def create_cafes_data(apps, schema_editor):
    """Создает категорию кафе и ресторанов с данными"""
    Category = apps.get_model('core', 'Category')
    Tenant = apps.get_model('core', 'Tenant')
    
    # Создаем категорию
    cafes_category, created = Category.objects.get_or_create(
        slug='cafes',
        defaults={'name': 'Кафе и Рестораны'}
    )
    
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
    
    # Создаем арендаторов
    for cafe_data in cafes_data:
        # Проверяем, существует ли уже арендатор с таким slug
        slug = slugify(cafe_data['name'])
        existing_tenant = Tenant.objects.filter(slug=slug).first()
        
        if existing_tenant:
            # Если арендатор существует, обновляем его категорию
            existing_tenant.category = cafes_category
            existing_tenant.save()
        else:
            # Если не существует, создаем новый
            Tenant.objects.create(
                name=cafe_data['name'],
                category=cafes_category,
                slug=slug,
                floor=cafe_data['floor'],
                description=cafe_data['description'],
                operating_hours=cafe_data['operating_hours'],
                has_delivery=cafe_data.get('has_delivery', False),
                has_promotions=cafe_data.get('has_promotions', False),
            )


def reverse_cafes_data(apps, schema_editor):
    """Откатывает изменения данных кафе"""
    Category = apps.get_model('core', 'Category')
    Tenant = apps.get_model('core', 'Tenant')
    
    # Удаляем только тех арендаторов, которые были созданы этой миграцией
    # (по умолчанию ничего не удаляем, чтобы не повредить существующие данные)
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_heroimage_update'),
    ]

    operations = [
        migrations.RunPython(create_cafes_data, reverse_cafes_data),
    ]
