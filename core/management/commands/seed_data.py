"""
Django management команда для заполнения базы данных тестовыми данными.

Использование:
    python manage.py seed_data
"""
from django.core.management.base import BaseCommand
from django.utils.text import slugify
from core.models import Category, Brand, Tenant, NewsArticle, Service, Vacancy


class Command(BaseCommand):
    help = 'Заполняет базу данных тестовыми данными для демонстрации'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Начинаем заполнение базы данных...'))
        
        # Очистка существующих данных (опционально)
        self.stdout.write('Очистка существующих данных...')
        Tenant.objects.all().delete()
        Brand.objects.all().delete()
        Category.objects.all().delete()
        NewsArticle.objects.all().delete()
        Service.objects.all().delete()
        Vacancy.objects.all().delete()
        
        # Создание категорий
        self.stdout.write('Создание категорий...')
        categories_data = [
            {'name': 'Магазины', 'slug': 'shops'},
            {'name': 'Кафе и Рестораны', 'slug': 'cafes'},
            {'name': 'Развлечения', 'slug': 'entertainment'},
            {'name': 'Услуги', 'slug': 'services'},
        ]
        
        categories = {}
        for cat_data in categories_data:
            category, created = Category.objects.get_or_create(
                slug=cat_data['slug'],
                defaults={'name': cat_data['name']}
            )
            categories[cat_data['slug']] = category
            if created:
                self.stdout.write(self.style.SUCCESS(f'  ✓ Создана категория: {category.name}'))
        
        # Создание брендов
        self.stdout.write('Создание брендов...')
        brands_data = [
            'ZARA',
            'LACOSTE',
            'BOSS',
            'DIESEL',
            'Massimo Dutti',
            'Calvin Klein',
            'H&M',
            'MANGO',
            'Pull&Bear',
            'Bershka'
        ]
        
        brands = {}
        for brand_name in brands_data:
            brand, created = Brand.objects.get_or_create(
                name=brand_name,
                defaults={}
            )
            brands[brand_name] = brand
            if created:
                self.stdout.write(self.style.SUCCESS(f'  ✓ Создан бренд: {brand.name}'))
        
        # Создание арендаторов - Магазины
        self.stdout.write('Создание арендаторов (магазины)...')
        shops_data = [
            {
                'name': 'ZARA',
                'brand': brands.get('ZARA'),
                'floor': '1 этаж',
                'description': 'ZARA - один из крупнейших международных модных ритейлеров. Предлагает последние тренды для женщин, мужчин и детей по доступным ценам.',
                'operating_hours': 'Пн-Вс: 10:00-22:00',
                'has_promotions': True,
                'has_loyalty_program': True,
            },
            {
                'name': 'BOSS',
                'brand': brands.get('BOSS'),
                'floor': '2 этаж',
                'description': 'Hugo Boss - премиальный немецкий бренд одежды и аксессуаров. Элегантный стиль для успешных людей.',
                'operating_hours': 'Пн-Вс: 10:00-22:00',
                'has_promotions': False,
                'has_loyalty_program': True,
            },
            {
                'name': 'Massimo Dutti',
                'brand': brands.get('Massimo Dutti'),
                'floor': '2 этаж',
                'description': 'Massimo Dutti - испанский бренд качественной одежды в стиле casual-chic. Изысканность в каждой детали.',
                'operating_hours': 'Пн-Вс: 10:00-22:00',
                'has_promotions': True,
                'has_loyalty_program': False,
            },
            {
                'name': 'H&M',
                'brand': brands.get('H&M'),
                'floor': '1 этаж',
                'description': 'H&M - шведский ритейлер модной одежды для всей семьи. Стиль и качество по лучшим ценам.',
                'operating_hours': 'Пн-Вс: 10:00-22:00',
                'has_promotions': True,
                'has_loyalty_program': True,
            },
            {
                'name': 'MANGO',
                'brand': brands.get('MANGO'),
                'floor': '1 этаж',
                'description': 'MANGO - испанский бренд женской и мужской одежды. Современный дизайн и отличное качество.',
                'operating_hours': 'Пн-Вс: 10:00-22:00',
                'has_promotions': False,
                'has_loyalty_program': True,
            },
            {
                'name': 'LACOSTE',
                'brand': brands.get('LACOSTE'),
                'floor': '2 этаж',
                'description': 'Lacoste - французский бренд спортивной и повседневной одежды. Легендарное качество с 1933 года.',
                'operating_hours': 'Пн-Вс: 10:00-22:00',
                'has_promotions': False,
                'has_loyalty_program': True,
            },
            {
                'name': 'Calvin Klein',
                'brand': brands.get('Calvin Klein'),
                'floor': '2 этаж',
                'description': 'Calvin Klein - американский дизайнерский бренд. Минималистичный стиль и премиальное качество.',
                'operating_hours': 'Пн-Вс: 10:00-22:00',
                'has_promotions': True,
                'has_loyalty_program': False,
            },
            {
                'name': 'Pull&Bear',
                'brand': brands.get('Pull&Bear'),
                'floor': '1 этаж',
                'description': 'Pull&Bear - бренд молодежной одежды в стиле casual. Свобода самовыражения и комфорт.',
                'operating_hours': 'Пн-Вс: 10:00-22:00',
                'has_promotions': True,
                'has_loyalty_program': True,
            },
            {
                'name': 'Bershka',
                'brand': brands.get('Bershka'),
                'floor': '1 этаж',
                'description': 'Bershka - трендовая молодежная мода для тех, кто любит выделяться. Актуальные коллекции каждый сезон.',
                'operating_hours': 'Пн-Вс: 10:00-22:00',
                'has_promotions': True,
                'has_loyalty_program': False,
            },
            {
                'name': 'DIESEL',
                'brand': brands.get('DIESEL'),
                'floor': '2 этаж',
                'description': 'Diesel - итальянский бренд джинсовой одежды премиум-класса. Смелый стиль для уверенных в себе.',
                'operating_hours': 'Пн-Вс: 10:00-22:00',
                'has_promotions': False,
                'has_loyalty_program': True,
            },
        ]
        
        for shop_data in shops_data:
            tenant, created = Tenant.objects.get_or_create(
                name=shop_data['name'],
                category=categories['shops'],
                defaults={
                    'slug': slugify(shop_data['name']),
                    'brand': shop_data.get('brand'),
                    'floor': shop_data['floor'],
                    'description': shop_data['description'],
                    'operating_hours': shop_data['operating_hours'],
                    'has_promotions': shop_data.get('has_promotions', False),
                    'has_loyalty_program': shop_data.get('has_loyalty_program', False),
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'  ✓ Создан магазин: {tenant.name}'))
        
        # Создание арендаторов - Кафе и рестораны
        self.stdout.write('Создание арендаторов (кафе и рестораны)...')
        cafes_data = [
            {
                'name': 'Starbucks',
                'floor': '1 этаж',
                'description': 'Starbucks - крупнейшая сеть кофеен в мире. Отличный кофе и уютная атмосфера.',
                'operating_hours': 'Пн-Вс: 08:00-23:00',
                'has_delivery': True,
                'has_business_lunch': False,
            },
            {
                'name': 'KFC',
                'floor': '3 этаж',
                'description': 'KFC - знаменитая сеть ресторанов быстрого питания. Легендарная курочка и бургеры.',
                'operating_hours': 'Пн-Вс: 10:00-23:00',
                'has_delivery': True,
                'has_business_lunch': True,
                'has_promotions': True,
            },
            {
                'name': 'Pizza Mia',
                'floor': '3 этаж',
                'description': 'Pizza Mia - итальянская пиццерия с аутентичными рецептами. Настоящий вкус Италии.',
                'operating_hours': 'Пн-Чт: 11:00-23:00\nПт-Вс: 11:00-00:00',
                'has_delivery': True,
                'has_business_lunch': True,
                'has_promotions': True,
            },
            {
                'name': 'Sushi Bar',
                'floor': '3 этаж',
                'description': 'Sushi Bar - свежие роллы и суши каждый день. Японская кухня в лучшем исполнении.',
                'operating_hours': 'Пн-Вс: 11:00-23:00',
                'has_delivery': True,
                'has_business_lunch': True,
            },
            {
                'name': 'Coffee House',
                'floor': '2 этаж',
                'description': 'Coffee House - уютная кофейня с авторским кофе и десертами. Идеальное место для встреч.',
                'operating_hours': 'Пн-Вс: 08:00-22:00',
                'has_delivery': False,
                'has_business_lunch': False,
            },
        ]
        
        for cafe_data in cafes_data:
            tenant, created = Tenant.objects.get_or_create(
                name=cafe_data['name'],
                category=categories['cafes'],
                defaults={
                    'slug': slugify(cafe_data['name']),
                    'floor': cafe_data['floor'],
                    'description': cafe_data['description'],
                    'operating_hours': cafe_data['operating_hours'],
                    'has_delivery': cafe_data.get('has_delivery', False),
                    'has_business_lunch': cafe_data.get('has_business_lunch', False),
                    'has_promotions': cafe_data.get('has_promotions', False),
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'  ✓ Создан ресторан: {tenant.name}'))
        
        # Создание арендаторов - Развлечения
        self.stdout.write('Создание арендаторов (развлечения)...')
        entertainment_data = [
            {
                'name': 'Cinematica',
                'floor': '4 этаж',
                'description': 'Cinematica - современный кинотеатр с 8 залами. Новейшие фильмы в отличном качестве.',
                'operating_hours': 'Пн-Вс: 09:00-02:00',
            },
            {
                'name': 'Kids Zone',
                'floor': '3 этаж',
                'description': 'Kids Zone - игровая зона для детей всех возрастов. Безопасно и весело!',
                'operating_hours': 'Пн-Вс: 10:00-22:00',
            },
            {
                'name': 'Game Center',
                'floor': '4 этаж',
                'description': 'Game Center - игровые автоматы, VR-аттракционы и боулинг. Развлечения для всей семьи.',
                'operating_hours': 'Пн-Вс: 10:00-00:00',
            },
        ]
        
        for ent_data in entertainment_data:
            tenant, created = Tenant.objects.get_or_create(
                name=ent_data['name'],
                category=categories['entertainment'],
                defaults={
                    'slug': slugify(ent_data['name']),
                    'floor': ent_data['floor'],
                    'description': ent_data['description'],
                    'operating_hours': ent_data['operating_hours'],
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'  ✓ Создано развлечение: {tenant.name}'))
        
        # Создание услуг
        self.stdout.write('Создание услуг...')
        services_data = [
            {
                'title': 'Бесплатный WiFi',
                'description': 'Высокоскоростной беспроводной интернет доступен во всех зонах торгового центра.'
            },
            {
                'title': 'Парковка',
                'description': 'Просторная подземная и наземная парковка на 1000+ автомобилей. Первые 2 часа бесплатно.'
            },
            {
                'title': 'Банкоматы',
                'description': 'Банкоматы крупнейших банков расположены на всех этажах.'
            },
            {
                'title': 'Обмен валют',
                'description': 'Пункт обмена валюты с выгодным курсом на 1 этаже.'
            },
            {
                'title': 'Детская комната',
                'description': 'Бесплатная комната матери и ребенка с пеленальными столиками.'
            },
        ]
        
        for service_data in services_data:
            service, created = Service.objects.get_or_create(
                title=service_data['title'],
                defaults={'description': service_data['description']}
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'  ✓ Создана услуга: {service.title}'))
        
        # Создание новостей
        self.stdout.write('Создание новостей...')
        news_data = [
            {
                'title': 'Грандиозное открытие Samarkand City Mall!',
                'content': '''Мы рады объявить об открытии самого современного торгового центра Самарканда!
                
Samarkand City Mall - это не просто торговый центр, это новое пространство для жизни, где вы найдете все необходимое под одной крышей.

Более 100 магазинов ведущих мировых и локальных брендов, 30 кафе и ресторанов, современный кинотеатр и развлекательные зоны для всей семьи.

Приходите и откройте для себя новый уровень шопинга!'''
            },
            {
                'title': 'Неделя больших скидок - до 70%!',
                'content': '''С 1 по 7 октября в Samarkand City Mall проходит Неделя больших скидок!

Скидки до 70% на одежду, обувь и аксессуары в более чем 50 магазинах.

Не упустите шанс обновить гардероб по выгодным ценам!

Условия акции уточняйте в магазинах-участниках.'''
            },
            {
                'title': 'Новый кинотеатр Cinematica уже открыт!',
                'content': '''На 4 этаже Samarkand City Mall открылся современный кинотеатр Cinematica.

8 комфортабельных залов, включая VIP-зал и IMAX.
Новейшее оборудование для лучшего качества звука и изображения.
Удобные кресла и приятные цены.

Билеты можно приобрести онлайн или в кассах кинотеатра.'''
            },
        ]
        
        for news_item_data in news_data:
            news, created = NewsArticle.objects.get_or_create(
                title=news_item_data['title'],
                defaults={
                    'slug': slugify(news_item_data['title']),
                    'content': news_item_data['content']
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'  ✓ Создана новость: {news.title}'))
        
        # Создание вакансий
        self.stdout.write('Создание вакансий...')
        vacancies_data = [
            {
                'title': 'Продавец-консультант',
                'description': 'В наш торговый центр требуются продавцы-консультанты в различные магазины одежды и аксессуаров.',
                'requirements': '''Требования:
- Опыт работы в розничной торговле от 1 года
- Коммуникабельность и клиентоориентированность
- Презентабельный внешний вид
- Знание русского и узбекского языков

Условия:
- Официальное трудоустройство
- График работы 2/2
- Конкурентная заработная плата'''
            },
            {
                'title': 'Менеджер по работе с арендаторами',
                'description': 'В управляющую компанию Samarkand City Mall требуется менеджер по работе с арендаторами.',
                'requirements': '''Требования:
- Высшее образование
- Опыт работы в сфере коммерческой недвижимости от 2 лет
- Навыки ведения переговоров
- Знание английского языка приветствуется

Условия:
- Официальное трудоустройство
- Полный рабочий день
- Достойная заработная плата'''
            },
        ]
        
        for vacancy_data in vacancies_data:
            vacancy, created = Vacancy.objects.get_or_create(
                title=vacancy_data['title'],
                defaults={
                    'description': vacancy_data['description'],
                    'requirements': vacancy_data['requirements']
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'  ✓ Создана вакансия: {vacancy.title}'))
        
        # Финальный отчет
        self.stdout.write('\n' + '='*50)
        self.stdout.write(self.style.SUCCESS('Заполнение базы данных завершено!'))
        self.stdout.write('='*50)
        self.stdout.write(f'Категорий: {Category.objects.count()}')
        self.stdout.write(f'Брендов: {Brand.objects.count()}')
        self.stdout.write(f'Арендаторов: {Tenant.objects.count()}')
        self.stdout.write(f'Новостей: {NewsArticle.objects.count()}')
        self.stdout.write(f'Услуг: {Service.objects.count()}')
        self.stdout.write(f'Вакансий: {Vacancy.objects.count()}')
        self.stdout.write('='*50 + '\n')

