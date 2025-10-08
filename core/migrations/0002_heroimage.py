# Generated manually for HeroImage model

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='HeroImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, verbose_name='Название')),
                ('image', models.ImageField(upload_to='hero/', verbose_name='Изображение')),
                ('description', models.TextField(blank=True, help_text='Краткое описание изображения', verbose_name='Описание')),
                ('is_active', models.BooleanField(default=True, verbose_name='Активно')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Дата обновления')),
            ],
            options={
                'verbose_name': 'Изображение главной страницы',
                'verbose_name_plural': 'Изображения главной страницы',
                'ordering': ['-created_at'],
            },
        ),
    ]
