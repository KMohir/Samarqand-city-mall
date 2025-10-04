"""
Контекстные процессоры для глобальных переменных в шаблонах.
"""
from .models import Category


def categories(request):
    """
    Добавляет список категорий во все шаблоны для построения навигации.
    """
    return {
        'all_categories': Category.objects.all()
    }

