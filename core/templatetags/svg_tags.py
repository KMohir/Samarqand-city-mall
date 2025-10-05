from django import template
from django.utils.safestring import mark_safe
import os
from django.conf import settings

register = template.Library()

@register.simple_tag
def svg_icon(name, class_name='', width='24', height='24'):
    """
    Template tag для вставки SVG иконок
    
    Использование:
    {% load svg_tags %}
    {% svg_icon "menu" "icon-class" "32" "32" %}
    
    Параметры:
    - name: имя SVG файла без расширения
    - class_name: CSS класс для стилизации
    - width: ширина иконки
    - height: высота иконки
    """
    svg_path = os.path.join(settings.STATIC_ROOT or settings.STATICFILES_DIRS[0], 'svg', f'{name}.svg')
    
    try:
        with open(svg_path, 'r', encoding='utf-8') as f:
            svg_content = f.read()
            
        # Добавляем атрибуты если они не указаны в SVG
        if 'width=' not in svg_content:
            svg_content = svg_content.replace('<svg', f'<svg width="{width}" height="{height}"')
        
        # Добавляем CSS класс если указан
        if class_name:
            if 'class=' in svg_content:
                svg_content = svg_content.replace('class="', f'class="{class_name} ')
            else:
                svg_content = svg_content.replace('<svg', f'<svg class="{class_name}"')
        
        return mark_safe(svg_content)
    except FileNotFoundError:
        return mark_safe(f'<!-- SVG файл {name}.svg не найден -->')

@register.simple_tag
def svg_inline(name, class_name=''):
    """
    Template tag для вставки SVG как inline элемент
    
    Использование:
    {% load svg_tags %}
    {% svg_inline "City Mall logo" "logo-class" %}
    """
    svg_path = os.path.join(settings.STATIC_ROOT or settings.STATICFILES_DIRS[0], 'svg', f'{name}.svg')
    
    try:
        with open(svg_path, 'r', encoding='utf-8') as f:
            svg_content = f.read()
            
        # Добавляем CSS класс если указан
        if class_name:
            if 'class=' in svg_content:
                svg_content = svg_content.replace('class="', f'class="{class_name} ')
            else:
                svg_content = svg_content.replace('<svg', f'<svg class="{class_name}"')
        
        return mark_safe(svg_content)
    except FileNotFoundError:
        return mark_safe(f'<!-- SVG файл {name}.svg не найден -->')
