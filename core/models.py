"""
Модели данных для приложения Samarkand City Mall.
"""
from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    """
    Модель категории - основные разделы сайта (Магазины, Кафе, Развлечения).
    Используется для построения главной навигации и фильтрации арендаторов.
    """
    name = models.CharField(max_length=100, unique=True, verbose_name='Название')
    slug = models.SlugField(unique=True, verbose_name='URL slug')
    icon = models.FileField(upload_to='categories/', blank=True, null=True, verbose_name='Иконка')

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'
        ordering = ['name']

    def __str__(self):
        return self.name


class Brand(models.Model):
    """
    Модель бренда - родительские бренды, чьи логотипы отображаются на главной странице.
    """
    name = models.CharField(max_length=100, unique=True, verbose_name='Название бренда')
    logo = models.ImageField(upload_to='brands/', verbose_name='Логотип')

    class Meta:
        verbose_name = 'Бренд'
        verbose_name_plural = 'Бренды'
        ordering = ['name']

    def __str__(self):
        return self.name


class Tenant(models.Model):
    """
    Центральная модель - представляет отдельный магазин, ресторан или сервисную точку.
    Консолидирует информацию из различных разделов референсного сайта.
    """
    # Основная информация
    name = models.CharField(max_length=200, verbose_name='Название')
    slug = models.SlugField(unique=True, verbose_name='URL slug')
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name='tenants',
        verbose_name='Категория'
    )
    brand = models.ForeignKey(
        Brand,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='tenants',
        verbose_name='Бренд'
    )
    logo = models.ImageField(upload_to='tenants/logos/', verbose_name='Логотип')
    cover_image = models.ImageField(
        upload_to='tenants/covers/',
        blank=True,
        null=True,
        verbose_name='Обложка'
    )
    description = models.TextField(verbose_name='Описание')
    
    # Локация
    floor = models.CharField(max_length=50, verbose_name='Этаж')
    location_on_map = models.CharField(
        max_length=200,
        blank=True,
        verbose_name='Местоположение на карте'
    )
    
    # Контакты и часы работы
    phone_number = models.CharField(max_length=50, blank=True, verbose_name='Телефон')
    website_url = models.URLField(blank=True, verbose_name='Веб-сайт')
    operating_hours = models.TextField(
        blank=True,
        verbose_name='Часы работы',
        help_text='Например: Пн-Чт: 10:00-23:00, Пт-Вс: 10:00-00:00'
    )
    
    # Поля для фильтрации и статусов
    has_promotions = models.BooleanField(
        default=False,
        verbose_name='Акции и скидки'
    )
    has_loyalty_program = models.BooleanField(
        default=False,
        verbose_name='Программа лояльности'
    )
    is_temporarily_closed = models.BooleanField(
        default=False,
        verbose_name='Временно закрыто'
    )
    has_delivery = models.BooleanField(
        default=False,
        verbose_name='Доставка'
    )
    has_business_lunch = models.BooleanField(
        default=False,
        verbose_name='Бизнес-ланч'
    )
    
    # Метаданные
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата обновления')

    class Meta:
        verbose_name = 'Арендатор'
        verbose_name_plural = 'Арендаторы'
        ordering = ['name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class NewsArticle(models.Model):
    """
    Модель новостной статьи.
    """
    title = models.CharField(max_length=255, verbose_name='Заголовок')
    slug = models.SlugField(unique=True, verbose_name='URL slug')
    image = models.ImageField(upload_to='news/', verbose_name='Изображение')
    content = models.TextField(verbose_name='Содержание')
    published_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата публикации')

    class Meta:
        verbose_name = 'Новость'
        verbose_name_plural = 'Новости'
        ordering = ['-published_date']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class Service(models.Model):
    """
    Модель услуги.
    """
    title = models.CharField(max_length=200, verbose_name='Название')
    description = models.TextField(verbose_name='Описание')
    icon = models.ImageField(upload_to='services/', blank=True, verbose_name='Иконка')

    class Meta:
        verbose_name = 'Услуга'
        verbose_name_plural = 'Услуги'
        ordering = ['title']

    def __str__(self):
        return self.title


class Vacancy(models.Model):
    """
    Модель вакансии.
    """
    title = models.CharField(max_length=200, verbose_name='Название')
    description = models.TextField(verbose_name='Описание')
    requirements = models.TextField(verbose_name='Требования')
    published_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата публикации')
    is_active = models.BooleanField(default=True, verbose_name='Активна')

    class Meta:
        verbose_name = 'Вакансия'
        verbose_name_plural = 'Вакансии'
        ordering = ['-published_date']

    def __str__(self):
        return self.title

