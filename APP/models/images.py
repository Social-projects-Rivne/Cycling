from __future__ import unicode_literals

from django.db import models

from bicycles import Bicycle

# Create your models here.

class Image(models.Model):

    url = models.URLField()
    bike_id = models.ForeignKey(Bicycle)
