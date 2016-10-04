from __future__ import unicode_literals

from django.db import models

from users import User

# Create your models here.

class Bicycle(models.Model):

    name = models.CharField(max_length=255, db_index=True)
    description = models.TextField(blank=True)
    is_deleted = models.BooleanField(default=False)
    owner_id = models.ForeignKey(User)
