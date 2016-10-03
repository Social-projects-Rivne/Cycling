from __future__ import unicode_literals

from django.db import models

from users import User

# Create your models here.

class Place(models.Model):
    
    CATEGORY = (
        ('0', 'store'),
        ('1', 'service'),
        ('2', 'cafe'),
    )

    name = models.CharField(max_length=255, db_index=True)
    location = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    from_hour = models.IntegerField(choices=range(1,25), null=True, blank=True)
    to_hour = models.IntegerField(choices=range(1,25), null=True, blank=True)
    category_id = models.CharField(max_length=1, choices=CATEGORY, default='2')
    owner_id = models.ForeignKey(User)
