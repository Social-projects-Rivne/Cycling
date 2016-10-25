# -*- encoding: utf-8 -*-
import json

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.http import HttpResponse

from APP.utils.login_util import PasswordMaster
from APP.utils.json_parser import json_parse_error, json_agr_missing
from APP.models import User
from APP.models.parkings import Parking
from APP.models.places import Place
from APP.models.stolen_bikes import StolenBike
from APP.utils.validator import Validator
from APP.utils.need_token import need_token

_valid_inputs = Validator()
_password_master = PasswordMaster()

def index(request):
    context = {
        'message': "Привіт, світе! Ви на головній сторінці Рівненського велододатку.",
        }
    return render(request, 'APP/index.html', context)


@csrf_exempt
def login(request):
    """
    This method handle user authentification on server.
    This mean it generate token to user.
    Request body:
    {
        "email": <user email>,
        "password": <user password>,
    }
    Success response body:
    {
        "token": <newly generated token>,
        "id": <user id>
    }
    Error response body:
    {
        "error": <error text message>,
        "code": <error code>
    }
    Error codes (json parse error not included):
      101* - missing email
      102* - missing password
      103 - missing user with specified email
      104 - invalid password

    * - this errors should be handled by client side ...
    """
    try:
        data = json.loads(request.body)
    except ValueError:
        return json_parse_error()

    if 'email' not in data:
        return json_agr_missing('email', 101)
    if 'password' not in data:
        return json_agr_missing('password', 102)

    user = User.objects.filter(email=data['email']).first()
    if not user:
        return JsonResponse({
            "error": "User with specified email not found",
            "code": 103
            })

    if _password_master.check_password(data['password'], user.password):
        user.token = _password_master.generate_token()
    else:
        return JsonResponse({
            "error": "Invalid password!",
            "code": 104
            })

    user.save()

    return JsonResponse({
        'ok': 200,
        'id': user.id,
        'token': user.token})


@csrf_exempt
def registration(request):
    """Receive json with user credentials,
    validate and in case of success add user
    with that credentials to database
    and return json with success
    or error in case of error
    """

    if request.method == "POST":
        result_dict = dict()
        if _valid_inputs.full_name_validation(request.POST['full_name']) and \
           _valid_inputs.email_validation(request.POST['email']):
            if User.objects.filter(email=request.POST["email"]).exists():
                result_dict['EmailError'] = 1
            if not result_dict:
                User.objects.create(
                    full_name=request.POST['full_name'],
                    email=request.POST['email'],
                    password=request.POST['password'],
                    role_id='0', token=_password_master.generate_token())
                result_dict['Success'] = 1
        else:
            result_dict['RulesError'] = 1
        return JsonResponse(result_dict)


def get_points(request, model_cls):
    """Returns entities with location within rectangle
    of sw and ne points. For more info on points look
    into similar methods of particular models
    mdl_cls - model class e.g. Place or SolenBike

    If we looking for Place we can filter points by category...
    If there is no categories JSON parameter it returns all categories.
    To filter points by categories use:
    {
        "categories": [
            {"id": 1},
            {"id": 3},
        ],
        "sw": "0, 0",
        "ne": "100, 100"
    }

    """

    def str_to_point(txt_point):
        return [float(x) for x in txt_point.split(',')]

    if request.method == 'GET':

        try:
            data = json.loads(request.body)
        except ValueError:
            return json_parse_error()

        if "sw" in data:
            sw_point = str_to_point(data["sw"])
        else:
            sw_point = str_to_point("44.3, 37.2")
        if "ne" in data:
            ne_point = str_to_point(data["ne"])
        else:
            ne_point = str_to_point("44.1, 37.4")

        entities = model_cls.objects

        # if we taking places
        if model_cls == Place:
            # if user specified categories to filter
            if "categories" in data:
                category_ids = [
                    str(data['categories'][i]['id'])
                    for i in range(len(data['categories']))]

                print category_ids

                entities = entities.filter(category_id__in=category_ids)

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
        # print data
        return HttpResponse(data, content_type="application/json")


def get_places_by_points(request):
    """Returns places with a location within rectangle
    of sw and ne points, where:
    sw - south west corner
    ne - north east corner
    The url is built like this:
    https://cycling.com/v1/places/search?sw=44.3,37.2&ne=44.1,37.4
    latitude is first, longitude - second
    """
    print ''
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
