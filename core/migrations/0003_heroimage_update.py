# Generated manually for HeroImage model update

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_heroimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='heroimage',
            name='title',
            field=models.CharField(blank=True, max_length=200, verbose_name='Название'),
        ),
    ]
