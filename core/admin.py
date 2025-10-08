"""
Настройка Django Admin для приложения Samarkand City Mall.
"""
from django.contrib import admin
from .models import Category, Brand, Tenant, NewsArticle, Service, Vacancy, HeroImage


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """
    Административная панель для модели Category.
    """
    list_display = ('name', 'slug')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}
    
    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    """
    Административная панель для модели Brand.
    """
    list_display = ('name', 'logo_preview')
    search_fields = ('name',)
    
    def logo_preview(self, obj):
        if obj.logo:
            return f'<img src="{obj.logo.url}" style="max-height: 50px; max-width: 100px; object-fit: contain;">'
        return '-'
    
    logo_preview.short_description = 'Логотип'
    logo_preview.allow_tags = True


@admin.register(Tenant)
class TenantAdmin(admin.ModelAdmin):
    """
    Административная панель для модели Tenant.
    Расширенная настройка для удобного управления арендаторами.
    """
    list_display = (
        'name',
        'category',
        'floor',
        'has_promotions',
        'has_loyalty_program',
        'is_temporarily_closed',
        'has_delivery',
        'logo_preview'
    )
    list_filter = (
        'category',
        'floor',
        'has_promotions',
        'has_loyalty_program',
        'is_temporarily_closed',
        'has_delivery',
        'has_business_lunch'
    )
    search_fields = ('name', 'description', 'floor')
    prepopulated_fields = {'slug': ('name',)}
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('name', 'slug', 'category', 'brand', 'description')
        }),
        ('Изображения', {
            'fields': ('logo', 'cover_image')
        }),
        ('Расположение', {
            'fields': ('floor', 'location_on_map')
        }),
        ('Контакты', {
            'fields': ('phone_number', 'website_url', 'operating_hours')
        }),
        ('Особенности', {
            'fields': (
                'has_promotions',
                'has_loyalty_program',
                'has_delivery',
                'has_business_lunch',
                'is_temporarily_closed'
            )
        }),
    )
    
    def logo_preview(self, obj):
        if obj.logo:
            return f'<img src="{obj.logo.url}" style="max-height: 50px; max-width: 100px; object-fit: contain;">'
        return '-'
    
    logo_preview.short_description = 'Логотип'
    logo_preview.allow_tags = True
    
    # Добавляем подсчет количества арендаторов по категориям
    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return queryset.select_related('category', 'brand')


@admin.register(NewsArticle)
class NewsArticleAdmin(admin.ModelAdmin):
    """
    Административная панель для модели NewsArticle.
    """
    list_display = ('title', 'published_date', 'image_preview')
    list_filter = ('published_date',)
    search_fields = ('title', 'content')
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published_date'
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('title', 'slug', 'image', 'content')
        }),
    )
    
    def image_preview(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" style="max-height: 50px; max-width: 100px; object-fit: cover;">'
        return '-'
    
    image_preview.short_description = 'Изображение'
    image_preview.allow_tags = True


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    """
    Административная панель для модели Service.
    """
    list_display = ('title', 'icon_preview')
    search_fields = ('title', 'description')
    
    def icon_preview(self, obj):
        if obj.icon:
            return f'<img src="{obj.icon.url}" style="max-height: 50px; max-width: 50px; object-fit: contain;">'
        return '-'
    
    icon_preview.short_description = 'Иконка'
    icon_preview.allow_tags = True


@admin.register(Vacancy)
class VacancyAdmin(admin.ModelAdmin):
    """
    Административная панель для модели Vacancy.
    """
    list_display = ('title', 'is_active', 'published_date')
    list_filter = ('is_active', 'published_date')
    search_fields = ('title', 'description', 'requirements')
    date_hierarchy = 'published_date'
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('title', 'description', 'requirements')
        }),
        ('Статус', {
            'fields': ('is_active',)
        }),
    )


@admin.register(HeroImage)
class HeroImageAdmin(admin.ModelAdmin):
    """
    Административная панель для модели HeroImage.
    Позволяет администратору управлять изображениями главной страницы.
    """
    list_display = ('image_preview', 'is_active', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ()
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Изображение', {
            'fields': ('image',)
        }),
        ('Статус', {
            'fields': ('is_active',)
        }),
    )
    
    def image_preview(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" style="max-height: 100px; max-width: 200px; object-fit: contain; border: 1px solid #ddd; border-radius: 4px;">'
        return '-'
    
    image_preview.short_description = 'Предварительный просмотр'
    image_preview.allow_tags = True


# Настройка заголовков админ-панели
admin.site.site_header = 'Samarkand City Mall - Административная панель'
admin.site.site_title = 'Samarkand City Mall Admin'
admin.site.index_title = 'Управление контентом'

