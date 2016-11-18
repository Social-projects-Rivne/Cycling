# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-10-18 17:27
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('APP', '0004_merge_20161016_0754'),
    ]

    operations = [
        migrations.AlterField(
            model_name='parking',
            name='lat',
            field=models.DecimalField(db_index=True, decimal_places=6, max_digits=8, null=True),
        ),
        migrations.AlterField(
            model_name='parking',
            name='lng',
            field=models.DecimalField(db_index=True, decimal_places=6, max_digits=9, null=True),
        ),
        migrations.AlterField(
            model_name='place',
            name='lat',
            field=models.DecimalField(db_index=True, decimal_places=6, max_digits=8, null=True),
        ),
        migrations.AlterField(
            model_name='place',
            name='lng',
            field=models.DecimalField(db_index=True, decimal_places=6, max_digits=9, null=True),
        ),
        migrations.AlterField(
            model_name='stolenbike',
            name='lat',
            field=models.DecimalField(db_index=True, decimal_places=6, max_digits=8, null=True),
        ),
        migrations.AlterField(
            model_name='stolenbike',
            name='lng',
            field=models.DecimalField(db_index=True, decimal_places=6, max_digits=9, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='role_id',
            field=models.CharField(choices=[('0', 'user'), ('1', 'admin')], default='0', max_length=1),
        ),
        migrations.AlterField(
            model_name='user',
            name='token',
            field=models.CharField(blank=True, db_index=True, default=None, max_length=255),
        ),
    ]
