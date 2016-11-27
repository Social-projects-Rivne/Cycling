# -*- encoding: utf-8 -*-

"""Contains views relaited to User model"""
import json

from datetime import datetime

from django.http import (HttpResponseBadRequest,
                         HttpResponseServerError, HttpResponse)
from django.core import serializers
from django.shortcuts import get_object_or_404

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
    kwargs['owner'] = request.user
    try:
        bike = Bicycle.objects.create(**kwargs)
        for link in params.get('imagesList', ['']):
            if link and link['url']:
                Image.objects.create(url=link['url'], bike=bike)
        data = serializers.serialize("json", [bike,])
        return HttpResponse(data, content_type="application/json")
    except Exception as e:
        bike.delete()
        return HttpResponseServerError(content=str(e))

def by_id(request, bike_id):
    """Get a Bicycle object from DB by id

    The url is built like this:
    https://cycling.com/api/bike/id
    it's a GET request
    """
    if request.method != 'GET':
        return HttpResponseBadRequest(content='Expected GET')
    bike = get_object_or_404(Bicycle, pk=bike_id)
    images = Image.objects.filter(bike=bike)
    data = [bike,]
    data.extend([i for i in images])
    data_in_json = serializers.serialize("json", data)
    return HttpResponse(data_in_json, content_type="application/json")

@need_token
def edit(request):
    """Edites a Bicycle object in DB

    The url is built like this:
    https://cycling.com/api/bike/edit
    it's a POST request
    """
    if request.method != 'POST':
        return HttpResponseBadRequest(content='Expected POST')
    params = json.loads(request.body)
    bike = get_object_or_404(Bicycle, pk=params['pk'])
    if not request.user == bike.owner:
        return HttpResponseBadRequest(content="Trying to edit somebody's else bicycle")
    try:
        bike.name = params['name']
        bike.description = params['description']
        bike.save()
        for link in params.get('imagesList', ['']):
            if link:
                img = Image.objects.get(pk=link['pk'])
                print link
                if img.bike == bike:
                    if link['toDelete']:
                        img.delete()
                    else:
                        img.url = link['url']
                        img.save()
        data = serializers.serialize("json", [bike,])
        return HttpResponse(data, content_type="application/json")
    except Exception as e:
        return HttpResponseServerError(content=str(e))
