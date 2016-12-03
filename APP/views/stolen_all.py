# -*- coding: utf-8 -*-
"""This module provide method to return stolen bikes by distance"""
import logging

from django.views.decorators.csrf import csrf_exempt
from django.db.models import Func, F
from django.http import JsonResponse, HttpResponse
from django.core import serializers

from APP.models import StolenBike, Bicycle, Image
from ..utils.need_token import need_token


logger = logging.getLogger(__name__)


class Sin(Func):
    function = 'SIN'


class Cos(Func):
    function = 'COS'


class Acos(Func):
    function = 'ACOS'


class Radians(Func):
    function = 'RADIANS'


@csrf_exempt
def get(request):
    """Return stolen bikes sorted by distance.

    Take get params:
    lat - center latitude
    long - center longitude
    distance - radius of data
    distancemin - minimum distance

    Author: Olexii
    """
    if request.method != "GET":
        logger.info("Unsupported method returned")
        return HttpResponse(status=405)

    lat = float(request.GET.get('lat'))
    lng = float(request.GET.get('lng'))
    distance = request.GET.get('distance')
    distance_min = request.GET.get('distance_min', 0)
    radlat = Radians(lat)
    radlong = Radians(lng)
    radflat = Radians(F('lat'))
    radflong = Radians(F('lng'))

    expression = 6371.0 * Acos(Cos(radlat) * Cos(radflat) *
                               Cos(radflong - radlong) +
                               Sin(radlat) * Sin(radflat))

    query = StolenBike.objects.annotate(
        distance=expression)
    query = query.filter(distance__range=(distance_min, distance))
    query = query.order_by('distance')

    result = []
    for stolen in query:
        bike = Bicycle.objects.get(pk=stolen.pk)
        image = Image.objects.get(bike=bike.pk)
        result.append({
            "description": stolen.description,
            "lat": stolen.lat,
            "lng": stolen.lng,
            "id": stolen.id,
            "bike": {
                "id": bike.id,
                "name": bike.name,
                "image": image.url
            }
        })

    return JsonResponse({
        "data": result,
        "count": len(result),
        "count_all": StolenBike.objects.count()
    })
