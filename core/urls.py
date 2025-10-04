"""
URL маршруты для приложения core.
"""
from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [
    # Главная страница
    path('', views.HomePageView.as_view(), name='home'),
    
    # Каталог по категориям
    path('catalog/<slug:category_slug>/', views.CatalogListView.as_view(), name='catalog'),
    
    # Детальная страница арендатора
    path('tenant/<slug:tenant_slug>/', views.TenantDetailView.as_view(), name='tenant_detail'),
    
    # Новости
    path('news/', views.NewsListView.as_view(), name='news_list'),
    path('news/<slug:news_slug>/', views.NewsDetailView.as_view(), name='news_detail'),
    
    # Поиск
    path('search/', views.SearchView.as_view(), name='search'),
]

