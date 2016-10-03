from __future__ import unicode_literals

from django.db import models

from parkings import Parking
from places import Place

# Create your models here.

class Attachment(models.Model):

    image_url = models.URLField()
    parking_id = models.ForeignKey(Parking)
    place_id = models.ForeignKey(Place)
