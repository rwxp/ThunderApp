# Generated by Django 4.1.3 on 2023-01-31 17:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ThunderApp', '0015_remove_bills_createduser'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='email',
            field=models.CharField(max_length=62, null=True),
        ),
    ]