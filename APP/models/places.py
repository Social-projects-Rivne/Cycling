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

    HOURS = tuple((x,"%02d"%x) for x in xrange(24))

    name = models.CharField(max_length=255, db_index=True)
    location = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    from_hour = models.IntegerField(choices=HOURS, null=True, blank=True)
    to_hour = models.IntegerField(choices=HOURS, null=True, blank=True)
    category_id = models.CharField(max_length=1, choices=CATEGORY, default='2')
    owner_id = models.ForeignKey(User)

    class Meta:
        """This class gives some options (metadata) attached to the model."""
        
        app_label = 'APP'
        db_table = 'Places'
