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

    password_master = PasswordMaster()
    if password_master.check_password(data['password'], user.password):
        user.token = password_master.generate_token()
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
    if request.method == "POST":
        print "Our post", request.POST["full_name"]
        result_dict = dict()
        obj_filter = User.objects.filter
        if _valid_inputs.full_name_validation(request.POST['full_name']) and \
           _valid_inputs.email_validation(request.POST['email']):
            if obj_filter(email=request.POST["email"]).exists():
                result_dict['EmailError'] = "Such email already exists!"
            else:
                try:
                    # handle token generation and password hashing
                    password_master = PasswordMaster()
                    token = password_master.generate_token()
                    raw_password = request.POST['password']
                    password = password_master.hash_password(raw_password)
                    user = User.objects.create(
                        full_name=request.POST['full_name'],
                        email=request.POST['email'],
                        password=password,
                        role_id='0',
                        token=token)
                    result_dict['Success'] = "true"
                    result_dict['token'] = token
                    result_dict['id'] = user.id
                except Exception, error:
                    print error
        else:
            result_dict['RulesError'] = "Error rules of input"
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
