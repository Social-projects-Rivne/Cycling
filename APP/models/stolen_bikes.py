from __future__ import unicode_literals

from django.db import models

from .bicycles import Bicycle

# Create your models here.

class StolenBike(models.Model):

    description = models.TextField(blank=True)
    # location = models.CharField(max_length=255)
    lat = models.DecimalField(max_digits=8, decimal_places=6, null=True, db_index=True)
    lng = models.DecimalField(max_digits=9, decimal_places=6, null=True, db_index=True)
    day = models.DateField()
    is_found = models.BooleanField(default=False)
    bike = models.ForeignKey(Bicycle)

    class Meta:
        """This class gives some options (metadata) attached to the model."""
        
        app_label = 'APP'
        db_table = 'StolenBikes'
