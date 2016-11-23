# -*- encoding: utf-8 -*-

"""Contains views relaited to objects with coordinates"""

from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers

from APP.models import StolenBike, Parking, Place


def marker_details(request):
    """Receive json with marker type and id,
    validate, select data from database in addition
    to type and id and return that data via JsonResponse.
    """

    if request.method == "GET":
        result_dict = dict()
        try:
            table = str(request.GET.get("type"))
            object_id = int(request.GET.get("id"))
            target_class = None
            if table == "StolenBike":
                target_class = StolenBike
            elif table == "Place":
                target_class = Place
            elif table == "Parking":
                target_class = Parking
            data = target_class.objects.filter(pk=object_id).first()
            result_dict["marker_details"] = serializers.serialize("json", [data])
            return JsonResponse(result_dict)
        except:
            return JsonResponse({"error": 1})


def get_points(request, model_cls):
    """Returns entities with location within rectangle
    of sw and ne points. For more info on points look
    into similar methods of particular models
    mdl_cls - model class e.g. Place or SolenBike

    If we looking for Place we can filter points by category...
    If there is no categories JSON parameter it returns all categories.
    Params:
    sw - (optional)
    ne - (optional)
    categories - (optional) default all, format [1, 3, 4] where 1, 3, 4 - ids.
    """

    def str_to_point(txt_point):
        """Docstring"""
        return [float(x) for x in txt_point.split(',')]

    if request.method == 'GET':
        sw_point = str_to_point(request.GET.get('sw'))
        ne_point = str_to_point(request.GET.get('ne'))

        entities = model_cls.objects

        # if we taking places
        if model_cls == Place:
            # if user specified categories to filter
            categories = request.GET.get('categories', None)
            print categories
            if categories:
                entities = entities.filter(category_id__in=categories)

        if sw_point[1] > ne_point[1]:
            entities = entities.filter(
                lng__lte=sw_point[1]).filter(lng__gte=ne_point[1])
        else:
            entities = entities.filter(
                lng__lte=ne_point[1]).filter(lng__gte=sw_point[1])

        if sw_point[0] > ne_point[0]:
            entities = entities.filter(
                lat__lte=sw_point[0]).filter(lat__gte=ne_point[0])
        else:
            entities = entities.filter(
                lat__lte=ne_point[0]).filter(lat__gte=sw_point[0])

        data = serializers.serialize("json", entities)

        return HttpResponse(data, content_type="application/json")
    else:
        return HttpResponse(status=405)


def get_places_by_points(request):
    """Returns places with a location within rectangle
    of sw and ne points, where:
    sw - south west corner
    ne - north east corner
    The url is built like this:
    https://cycling.com/v1/places/search?sw=44.3,37.2&ne=44.1,37.4
    latitude is first, longitude - second
    """
    print 'place call'
    return get_points(request, Place)


def get_parkings_by_points(request):
    """Returns parking places with a location within rectangle
    of sw and ne points, where:
    sw - south west corner
    ne - north east corner
    The url is built like this:
    https://cycling.com/v1/parkings/search?sw=44.3,37.2&ne=44.1,37.4
    latitude is first, longitude - second
    """
    return get_points(request, Parking)


def get_stolen_bikes_by_points(request):
    """Returns stolen bikes with a location within rectangle
    of sw and ne points, where:
    sw - south west corner
    ne - north east corner
    The url is built like this:
    https://cycling.com/v1/stolen/search?sw=44.3,37.2&ne=44.1,37.4
    latitude is first, longitude - second
    """
    return get_points(request, StolenBike)


@csrf_exempt
def get_categories(request):
    """
    This method returns all posible categories.
    Response example:
    {
    "response": [
        {
            "id": "0",
            "name": "store"
        },
        {
            "id": "1",
            "name": "service"
        },
        {
            "id": "2",
            "name": "cafe"
        }
    ]
    }
    Error code:
      105 - unsupported method type
    """
    if request.method != "GET":
        return JsonResponse({"error": "Unsupported method", "code": 105})

    result = []
    for category_id, category_name in Place.CATEGORY:
        result.append({"id": category_id, "name": category_name})
    return JsonResponse({"response": result})
