# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-10-20 09:42
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('APP', '0005_auto_20161018_2027'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attachment',
            name='parking',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='APP.Parking'),
        ),
        migrations.AlterField(
            model_name='attachment',
            name='place',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='APP.Place'),
        ),
    ]