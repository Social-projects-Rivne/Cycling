# -*- encoding: utf-8 -*-

"""Contains views relaited to User model"""
import json

from datetime import datetime

from django.http import (HttpResponseBadRequest,
                         HttpResponseServerError, HttpResponse)
from django.core import serializers

from APP.models import User, Bicycle, Image
from APP.utils.need_token import need_token

@need_token
def create(request):
    """Creates new Bicycle object in DB

    The url is built like this:
    https://cycling.com/api/bike/create
    it's a POST request
    """
    if request.method != 'POST':
        return HttpResponseBadRequest(content='Expected POST')
    params = json.loads(request.body)
    kwargs = {}
    kwargs['name'] = params.get('name', None)
    if kwargs['name'] is None:
        return HttpResponseBadRequest(content='There should be "name" field')
    kwargs['description'] = params.get('description', None)
    kwargs['owner'] = User.objects.get(token=params['token'])
    try:
        bike = Bicycle.objects.create(**kwargs)
        for link in params.get('urls', ['']):
            if link:
                img = Image.objects.create(url=link, bike=bike)
        data = serializers.serialize("json", [bike,])
        return HttpResponse(data, content_type="application/json")
    except Exception as e:
        bike.delete()
        return HttpResponseServerError(content=str(e))