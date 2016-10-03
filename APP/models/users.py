from __future__ import unicode_literals

from django.db import models

# Create your models here.

class User(models.Model):
    
    ROLES = (
        ('0', 'user'),
        ('1', 'admin'),
    )

    full_name = models.CharField(max_length=255, db_index=True)
    email = models.EmailField(unique=True, db_index=True)
    password = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    avatar = models.URLField()
    role_id = models.CharField(max_length=1, choices=ROLES, db_index=True)
