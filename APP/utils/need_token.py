#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""This module provides token require decorator."""
import json
import logging

from django.http import JsonResponse

from APP.models import User
from APP.utils.json_parser import json_parse_error, json_agr_missing


logger = logging.getLogger(__name__)


def need_token(decorated_func):
    """Django request decorator, check request token.

    This decorator check if parameters contain valid token.
    If it is valid add user to request param.

    Author: Olexii
    """
    def wrapper(*args, **kwargs):

        logger.debug("called check token")

        request = args[0]

        if request.method == "POST":
            try:
                json_body = json.loads(request.body)

                token = json_body.get('token')

            except ValueError:
                return json_parse_error()
        else:
            token = request.GET.get("token")

        if token:
            logger.debug("token found")

            user = User.objects.filter(
                token=token).first()

            if user:
                logger.debug("user with specidied token found")
                request.user = user
                return decorated_func(*args, **kwargs)
            else:
                logger.info("invalid token error")
                return JsonResponse({'error': 'Invalid token.'})
        else:
            return json_agr_missing('token')

    return wrapper
