# -*- encoding: utf-8 -*-
"""Contains views relaited to User model"""
import json

from datetime import datetime

from django.http import (HttpResponseBadRequest,
                         HttpResponseServerError, HttpResponse)
from django.core import serializers

from APP.models import User, Bicycle, StolenBike
from APP.utils.need_token import need_token


@need_token
def create_stolen(request):
    """Creates new StolenBike object in DB

    The url is built like this:
    https://cycling.com/api/stolen/create
    it's a POST request
    """
    if request.method != 'POST':
        return HttpResponseBadRequest(content='Expected POST')
    params = json.loads(request.body)
    kwargs = {}
    try:
        kwargs['lat'] = float(params.get('lat', None))
    except (TypeError, ValueError):
        return HttpResponseBadRequest(content='Lattitude value is invalid')

    try:
        kwargs['lng'] = float(params.get('lng', None))
    except (TypeError, ValueError):
        return HttpResponseBadRequest(content='Longitude value is invalid')

    kwargs['description'] = params.get('description', None)
    try:
        kwargs['day'] = datetime.strptime(params.get('day', None), "").date()
    except (TypeError, ValueError):
        return HttpResponseBadRequest(
            content='The date of the event is invalid')

    try:
        kwargs['is_found'] = bool(params.get('is_found', None))
    except (TypeError, ValueError):
        kwargs['is_found'] = None

    try:
        kwargs['bike'] = int(params.get('bike', None))
    except (TypeError, ValueError):
        return HttpResponseBadRequest(content='The bicycle ID is invalid')

    kwargs['bike'] = Bicycle.objects.get(pk=kwargs['bike'])
    try:
        stolen = StolenBike.objects.create(**kwargs)
        data = serializers.serialize("json", [stolen, ])
        return HttpResponse(data, content_type="application/json")
    except Exception as err:
        return HttpResponseServerError(content=str(err))
