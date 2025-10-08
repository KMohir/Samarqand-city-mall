from django.core.management.base import BaseCommand
from core.models import NewsArticle
from datetime import datetime

class Command(BaseCommand):
    help = 'Создает новости для сайта'

    def handle(self, *args, **options):
        # Удаляем существующие новости
        NewsArticle.objects.all().delete()
        self.stdout.write("Удалены существующие новости")
        
        # Создаем новости
        news_data = [
            {
                'title': 'Новый кинотеатр Cinematica уже открыт!',
                'slug': 'novyy-kinoteatr-cinematica-uzhe-otkryt',
                'content': '''На 4 этаже Samarkand City Mall открылся современный кинотеатр Cinematica. 

8 комфортабельных залов, включая VIP-зал и IMAX. Новейшее оборудование для лучшего качества звука и изображения. Удобные кресла и приятные цены.

Расписание сеансов и билеты можно приобрести в кассе кинотеатра или онлайн на нашем сайте.

Добро пожаловать в мир кино!''',
                'published_date': datetime(2025, 10, 8, 10, 0)
            },
            {
                'title': 'Неделя больших скидок - до 70%!',
                'slug': 'nedelya-bolshikh-skidok-do-70',
                'content': '''С 1 по 7 октября в Samarkand City Mall проходит Неделя больших скидок!

Скидки до 70% на одежду, обувь и аксессуары в более чем 50 магазинах. Не упустите шанс обновить гардероб по выгодным ценам.

Участвуют: ZARA, H&M, Massimo Dutti, Calvin Klein, Nike, Adidas и многие другие.

Акция действует до 7 октября включительно. Количество товаров ограничено!''',
                'published_date': datetime(2025, 10, 8, 9, 0)
            },
            {
                'title': 'Грандиозное открытие Samarkand City Mall!',
                'slug': 'grandioznoe-otkrytie-samarkand-city-mall',
                'content': '''Мы рады объявить об открытии самого современного торгового центра Самарканда!

Samarkand City Mall - это не просто торговый центр, это новое пространство для жизни, где вы найдете все необходимое под одной крышей.

Более 200 магазинов, ресторанов и развлечений. Современная архитектура, удобная парковка и отличное расположение в центре города.

Добро пожаловать в будущее шопинга!''',
                'published_date': datetime(2025, 10, 8, 8, 0)
            }
        ]
        
        for news_item in news_data:
            NewsArticle.objects.create(**news_item)
            self.stdout.write(f"Создана новость: {news_item['title']}")
        
        self.stdout.write(f"\nВсего создано новостей: {NewsArticle.objects.count()}")
