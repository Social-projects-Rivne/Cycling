#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
This module provides token require decorator
"""
import json

from django.http import JsonResponse

from APP.models import User
from APP.utils.json_parser import json_parse_error, json_agr_missing


def need_token(decorated_func):
    """
    This is decorator which check if parameters contain valid token
    """
    def wrapper(*args, **kwargs):
        """
        Wrapper to function
        """

        request = args[0]

        # if it`s post method then we should parse body
        # else
        # params
        if request.method == "POST":
            try:
                json_body = json.loads(request.body)

                token = json_body.get('token')

            except ValueError:
                return json_parse_error()
        else:
            token = request.GET.get("token")

        if token:
            user = User.objects.filter(
                token=token).first()

            if user:
                return decorated_func(*args, **kwargs)
            else:
                return JsonResponse({'error': 'Invalid token.'})
        else:
            return json_agr_missing('token')

    return wrapper
