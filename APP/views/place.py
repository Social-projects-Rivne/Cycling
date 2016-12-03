# -*- encoding: utf-8 -*-
"""Contains the view for creating a new place (store, cafe or bike service)"""
import json

from django.http import (HttpResponseBadRequest,
                         HttpResponseServerError, HttpResponse)
from django.core import serializers

from APP.models import User, Place
from APP.utils.need_token import need_token


@need_token
def create_place(request):
    """Creates new Place object in DB

    The url is built like this:
    https://cycling.com/api/place/create
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
    kwargs['description'] = params.get('description', None)
    try:
        kwargs['from_hour'] = int(params.get('from_hour', None))
    except (TypeError, ValueError):
        kwargs['from_hour'] = None
    try:
        kwargs['to_hour'] = int(params.get('to_hour', None))
    except (TypeError, ValueError):
        kwargs['to_hour'] = None
    try:
        kwargs['category_id'] = int(params.get('category_id', 2))
    except (TypeError, ValueError):
        kwargs['category_id'] = 2
    kwargs['owner'] = User.objects.get(token=params['token'])
    try:
        place = Place.objects.create(**kwargs)
        data = serializers.serialize("json", [place, ])
        return HttpResponse(data, content_type="application/json")
    except Exception as e:
        return HttpResponseServerError(content=str(e))
