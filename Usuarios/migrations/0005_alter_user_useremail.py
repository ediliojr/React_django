# Generated by Django 4.0 on 2023-03-14 01:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Usuarios', '0004_rename_data_cadastro_user_userdata_cadastro_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='UserEmail',
            field=models.EmailField(max_length=150, verbose_name='Email'),
        ),
    ]
