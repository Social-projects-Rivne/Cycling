from __future__ import unicode_literals

from django.db import models

from .bicycles import Bicycle

# Create your models here.

class Image(models.Model):

    url = models.URLField()
    bike = models.ForeignKey(Bicycle)

    class Meta:
        """This class gives some options (metadata) attached to the model."""

        app_label = 'APP'
        db_table = 'Images'
