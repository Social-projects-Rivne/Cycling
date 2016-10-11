from __future__ import unicode_literals

from django.db import models

from .parkings import Parking
from .places import Place

# Create your models here.

class Attachment(models.Model):

    image_url = models.URLField()
    parking = models.ForeignKey(Parking)
    place = models.ForeignKey(Place)

    class Meta:
        """This class gives some options (metadata) attached to the model."""

        app_label = 'APP'
        db_table = 'Attachments'
