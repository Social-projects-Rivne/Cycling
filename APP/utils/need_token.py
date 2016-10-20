#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
This module provides token require decorator
"""
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
        print args
        print kwargs
        # looking for request param in kwargs
        if 'request' in kwargs:
            request_raw = kwargs.get('request').body
            print 'kwargs: ', request_raw
        else:
            # if in kwargs no request, then look in args
            if len(args) != 0:
                request_raw = args[0]
                print request_raw.body

        # if there is request param somewhere
        if request_raw:
            try:
                request_json = json.loads(request_raw)
                if 'token' in request_json:
                    user = User.models.filter(
                        token=request_json.get('token')).first()

                    if user:
                        return decorated_func(*args, **kwargs)
                    else:
                        return JsonResponse({'error': 'No token found'})

                else:
                    return json_agr_missing('token')
            except ValueError:
                return json_parse_error()

    return wrapper
