# Generated by Django 4.1.3 on 2023-01-28 18:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ThunderApp', '0013_users_created_alter_users_lastname'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='users',
            name='created',
        ),
        migrations.AddField(
            model_name='bills',
            name='createdUser',
            field=models.BooleanField(default=False),
        ),
    ]