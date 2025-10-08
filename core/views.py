"""
Представления для приложения Samarkand City Mall.
"""
from django.views.generic import TemplateView, ListView, DetailView
from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import Brand, Tenant, NewsArticle, Category, HeroImage


class HomePageView(TemplateView):
    """
    Главная страница сайта.
    Отображает список брендов и основную информацию о торговом центре.
    """
    template_name = 'home.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['brand_list'] = Brand.objects.all()
        
        # Получаем активное изображение для Hero секции
        try:
            context['hero_image'] = HeroImage.objects.filter(is_active=True).first()
        except HeroImage.DoesNotExist:
            context['hero_image'] = None
        
        return context


class CatalogListView(ListView):
    """
    Страница каталога с фильтрацией.
    Самое сложное представление, реализующее каталог с динамической фильтрацией.
    """
    model = Tenant
    template_name = 'core/catalog_list.html'
    context_object_name = 'tenants'
    paginate_by = 12

    def get_queryset(self):
        """
        Получаем queryset с применением фильтров из GET параметров.
        """
        queryset = Tenant.objects.select_related('category', 'brand')
        
        # Фильтр по категории из URL
        category_slug = self.kwargs.get('category_slug')
        if category_slug:
            try:
                # Проверяем, существует ли категория
                category = Category.objects.get(slug=category_slug)
                queryset = queryset.filter(category=category)
            except Category.DoesNotExist:
                # Если категория не найдена, показываем пустой queryset
                queryset = Tenant.objects.none()
        
        # Динамические фильтры из GET параметров
        if self.request.GET.get('has_promotions') == 'true':
            queryset = queryset.filter(has_promotions=True)
        
        if self.request.GET.get('has_loyalty_program') == 'true':
            queryset = queryset.filter(has_loyalty_program=True)
        
        if self.request.GET.get('is_temporarily_closed') == 'true':
            queryset = queryset.filter(is_temporarily_closed=True)
        
        if self.request.GET.get('has_delivery') == 'true':
            queryset = queryset.filter(has_delivery=True)
        
        if self.request.GET.get('has_business_lunch') == 'true':
            queryset = queryset.filter(has_business_lunch=True)
        
        # Сортировка
        sort = self.request.GET.get('sort', '')
        if sort == 'az':
            queryset = queryset.order_by('name')
        elif sort == 'za':
            queryset = queryset.order_by('-name')
        
        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        # Получаем текущую категорию
        category_slug = self.kwargs.get('category_slug')
        if category_slug:
            try:
                context['current_category'] = Category.objects.get(slug=category_slug)
            except Category.DoesNotExist:
                # Если категория не найдена, показываем все арендаторы
                context['current_category'] = None
        else:
            context['current_category'] = None
        
        # Передаем активные фильтры для отображения в UI
        context['active_filters'] = {
            'has_promotions': self.request.GET.get('has_promotions') == 'true',
            'has_loyalty_program': self.request.GET.get('has_loyalty_program') == 'true',
            'is_temporarily_closed': self.request.GET.get('is_temporarily_closed') == 'true',
            'has_delivery': self.request.GET.get('has_delivery') == 'true',
            'has_business_lunch': self.request.GET.get('has_business_lunch') == 'true',
        }
        
        context['current_sort'] = self.request.GET.get('sort', '')
        
        return context


class TenantDetailView(DetailView):
    """
    Детальная страница арендатора (магазина/ресторана).
    """
    model = Tenant
    template_name = 'core/tenant_detail.html'
    context_object_name = 'tenant'
    slug_url_kwarg = 'tenant_slug'


class NewsListView(ListView):
    """
    Список новостей.
    """
    model = NewsArticle
    template_name = 'core/news_list.html'
    context_object_name = 'news_list'
    paginate_by = 9


class NewsDetailView(DetailView):
    """
    Детальная страница новости.
    """
    model = NewsArticle
    template_name = 'core/news_detail.html'
    context_object_name = 'news'
    slug_url_kwarg = 'news_slug'


class SearchView(ListView):
    """
    Страница поиска по арендаторам.
    """
    model = Tenant
    template_name = 'core/search_results.html'
    context_object_name = 'search_results'
    paginate_by = 12

    def get_queryset(self):
        query = self.request.GET.get('q', '')
        if query:
            # Поиск по нескольким полям с использованием Q объектов
            return Tenant.objects.filter(
                Q(name__icontains=query) |
                Q(description__icontains=query)
            ).select_related('category', 'brand')
        return Tenant.objects.none()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['search_query'] = self.request.GET.get('q', '')
        return context


class SvgExamplesView(TemplateView):
    """
    Страница с примерами использования SVG иконок.
    """
    template_name = 'svg_examples.html'


class ReactHomePageView(TemplateView):
    """
    React версия главной страницы.
    """
    template_name = 'react_home.html'


def hero_image_api(request):
    """
    API endpoint для получения активного изображения Hero секции.
    Возвращает JSON с информацией об активном изображении.
    """
    try:
        hero_image = HeroImage.objects.filter(is_active=True).first()
        if hero_image:
            return JsonResponse({
                'id': hero_image.id,
                'title': hero_image.title,
                'url': hero_image.image.url,
                'description': hero_image.description,
                'created_at': hero_image.created_at.isoformat(),
            })
        else:
            return JsonResponse({'error': 'No active hero image found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

