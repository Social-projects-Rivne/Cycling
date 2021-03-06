from __future__ import unicode_literals

from django.db import models

from .users import User


class Bicycle(models.Model):
    """Fields:
    name char
    description text
    is_deleted  boolean
    owner User model

    also available the Image connected via foreign key"""
    name = models.CharField(max_length=255, db_index=True)
    description = models.TextField(blank=True)
    is_deleted = models.BooleanField(default=False)
    owner = models.ForeignKey(User)

    class Meta:
        """This class gives some options (metadata) attached to the model."""

        app_label = 'APP'
        db_table = 'Bicycles'
