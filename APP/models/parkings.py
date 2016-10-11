from __future__ import unicode_literals

from django.db import models

from .users import User

# Create your models here.

class Parking(models.Model):

    IS_SECURE = (
        ('0', 'none'),
        ('1', 'good'),
        ('2', 'high'),
    )

    name = models.CharField(max_length=255, db_index=True)
    # location = models.CharField(max_length=255)
    lat = models.DecimalField(max_digits=8, decimal_places=6, null=True)
    lng = models.DecimalField(max_digits=9, decimal_places=6, null=True)
    security = models.CharField(max_length=1, choices=IS_SECURE, default='0')
    amount = models.PositiveSmallIntegerField(default=3)
    is_free = models.BooleanField(default=True)
    owner = models.ForeignKey(User)

    class Meta:
        """This class gives some options (metadata) attached to the model."""
        
        app_label = 'APP'
        db_table = 'Parkings'
