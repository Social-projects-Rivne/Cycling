# -*- encoding: utf-8 -*-
"""Contains the view for creating a new parking"""
import json

from django.http import (HttpResponseBadRequest,
                         HttpResponseServerError, HttpResponse, )
from django.core import serializers

from APP.models import User, Parking
from APP.utils.need_token import need_token


@need_token
def create_parking(request):
    """Creates new Parking object in DB

    The url is built like this:
    https://cycling.com/api/parking/create
    it's a POST request
    """
    if request.method != 'POST':
        return HttpResponseBadRequest(content='Expected POST')
    params = json.loads(request.body)
    kwargs = {}
    kwargs['name'] = params.get('name', None)
    if kwargs['name'] is None:
        return HttpResponseBadRequest(content='There should be "name" field')
    try:
        kwargs['lat'] = float(params.get('lat', None))
    except (TypeError, ValueError):
        return HttpResponseBadRequest(content='Lattitude value is invalid')
    try:
        kwargs['lng'] = float(params.get('lng', None))
    except (TypeError, ValueError):
        return HttpResponseBadRequest(content='Longitude value is invalid')
    try:
        kwargs['security'] = int(params.get('security', None))
    except (TypeError, ValueError):
        kwargs['security'] = None
    try:
        kwargs['amount'] = int(params.get('amount', None))
    except (TypeError, ValueError):
        kwargs['amount'] = None
    try:
        kwargs['is_free'] = int(params.get('is_free', None))
    except (TypeError, ValueError):
        kwargs['is_free'] = None
    kwargs['owner'] = User.objects.get(token=params['token'])
    try:
        parking = Parking.objects.create(**kwargs)
        data = serializers.serialize("json", [parking, ])
        return HttpResponse(data, content_type="application/json")
    except Exception as e:
        return HttpResponseServerError(content=str(e))
