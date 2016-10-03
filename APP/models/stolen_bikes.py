from __future__ import unicode_literals

from django.db import models

from bicycles import Bicycle

# Create your models here.

class StolenBike(models.Model):

    description = models.TextField(blank=True)
    location = models.CharField(max_length=255)
    day = models.DateField()
    is_found = models.models.BooleanField(default=False)
    bike_id = models.ForeignKey(Bicycle)
