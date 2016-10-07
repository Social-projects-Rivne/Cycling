from __future__ import unicode_literals

from django.db import models

from .bicycles import Bicycle

# Create your models here.

class StolenBike(models.Model):

    description = models.TextField(blank=True)
    location = models.CharField(max_length=255)
    day = models.DateField()
    is_found = models.BooleanField(default=False)
    bike_id = models.ForeignKey(Bicycle)

    class Meta:
        """This class gives some options (metadata) attached to the model."""
        
        app_label = 'APP'
        db_table = 'StolenBikes'
