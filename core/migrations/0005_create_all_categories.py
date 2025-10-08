# Generated manually for creating all categories

from django.db import migrations


def create_all_categories(apps, schema_editor):
    """Создает все необходимые категории"""
    Category = apps.get_model('core', 'Category')
    
    categories_data = [
        {'name': 'Магазины', 'slug': 'shops'},
        {'name': 'Кафе и Рестораны', 'slug': 'cafes'},
        {'name': 'Развлечения', 'slug': 'entertainment'},
        {'name': 'Услуги', 'slug': 'services'},
    ]
    
    for cat_data in categories_data:
        Category.objects.get_or_create(
            slug=cat_data['slug'],
            defaults={'name': cat_data['name']}
        )


def reverse_all_categories(apps, schema_editor):
    """Удаляет все категории"""
    Category = apps.get_model('core', 'Category')
    
    Category.objects.filter(slug__in=['shops', 'cafes', 'entertainment', 'services']).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_create_cafes_data'),
    ]

    operations = [
        migrations.RunPython(create_all_categories, reverse_all_categories),
    ]
