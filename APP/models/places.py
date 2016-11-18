from __future__ import unicode_literals

from django.db import models

from .users import User

# Create your models here.

class Place(models.Model):

    CATEGORY = (
        ('0', 'store'),
        ('1', 'service'),
        ('2', 'cafe'),
    )

    HOURS = tuple((x, "%02d"%x) for x in xrange(24))

    name = models.CharField(max_length=255, db_index=True)
    # location = models.CharField(max_length=255)
    lat = models.DecimalField(max_digits=8, decimal_places=6, null=True, db_index=True)
    lng = models.DecimalField(max_digits=9, decimal_places=6, null=True, db_index=True)
    description = models.TextField(null=True, blank=True)
    from_hour = models.IntegerField(choices=HOURS, null=True, blank=True)
    to_hour = models.IntegerField(choices=HOURS, null=True, blank=True)
    category_id = models.CharField(max_length=1, choices=CATEGORY, default='2')
    owner = models.ForeignKey(User)

    class Meta:
        """This class gives some options (metadata) attached to the model."""

        app_label = 'APP'
        db_table = 'Places'
