# Generated by Django 4.1.2 on 2022-12-20 17:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ThunderApp', '0002_alter_users_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='isActive',
            field=models.BooleanField(default=True),
        ),
    ]
