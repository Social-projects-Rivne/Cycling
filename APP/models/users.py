from __future__ import unicode_literals
from random import choice

from django.db import models


av_list = [
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/217538/default-avatar-ponsy-deer.png',
    'http://images.all-free-download.com/images/graphiclarge/vector_pleasant_goat_avatar_179848.jpg',
    'http://s3-us-west-1.amazonaws.com/witty-avatars/default-avatar-3-l.jpg',
    'https://tiltify.com/assets/default-avatar-0b86a09c31209b5eb42080feeafc4dd4.jpg',
    'http://i.imgur.com/vDhhizN.jpg?1',
]


class User(models.Model):
    """"""

    ROLES = (
        ('0', 'user'),
        ('1', 'admin'),
    )

    full_name = models.CharField(max_length=255, db_index=True)
    email = models.EmailField(unique=True, db_index=True)
    password = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    avatar = models.URLField(blank=True, default=choice(av_list))
    role_id = models.CharField(max_length=1, choices=ROLES, default='0')
    token = models.CharField(
        max_length=255, db_index=True, blank=True, default=None)

    class Meta:
        """This class gives some options (metadata) attached to the model."""

        app_label = 'APP'
        db_table = 'Users'
