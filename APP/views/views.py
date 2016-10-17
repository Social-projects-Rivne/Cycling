# -*- encoding: utf-8 -*-
import json

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.http import HttpResponse

from ..models import *
from ..utils.login_util import PasswordMaster
from ..utils.json_parser import json_parse_error, json_agr_missing

from APP.models import User
from APP.models.parkings import Parking
from APP.models.places import Place
from APP.models.stolen_bikes import StolenBike
from APP.utils.validator import Validator

_valid_inputs = Validator()


def index(request):
    context = {
        'message': "Привіт, світе! Ви на головній сторінці Рівненського велододатку.",
        }
    return render(request, 'APP/index.html', context)


@csrf_exempt
def login(request):
    print "HELLOW"
    try:
        data = json.loads(request.body)
    except ValueError:
        return json_parse_error()

    if 'email' not in data:
        return json_agr_missing('email')
    if 'password' not in data:
        return json_agr_missing('password')

    user = User.objects.filter(email=data['email']).first()
    if not user:
        return JsonResponse({"error": "User with specified email not found"})

    password_master = PasswordMaster()
    if password_master.check_password(data['password'], user.password):
        user.token = password_master.generate_token()
    else:
        return JsonResponse({"error": "Invalid password!"})

    user.save()

    return JsonResponse({
        'ok': 200,
        'id': user.id,
        'token': user.token})


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
        if 'request' in kwargs:
            request_raw = kwargs.get('request').body
            print 'kwargs: ', request_raw
        else:
            if len(args) != 0:
                request_raw = args[0]
                print request_raw.body
        if request_raw:
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

    return wrapper


@csrf_exempt
def registration(request):
    if request.method == "POST":
        print "Our post", request.POST["full_name"]
        result_dict = dict()
        obj_filter = User.objects.filter
        if _valid_inputs.full_name_validation(request.POST['full_name']) and \
           _valid_inputs.email_validation(request.POST['email']):
            if obj_filter(full_name=request.POST["full_name"]).exists():
                result_dict['NameError'] = "Such full name already exists!"
            if obj_filter(email=request.POST["email"]).exists():
                result_dict['EmailError'] = "Such email already exists!"
            if obj_filter(password=request.POST["password"]).exists():
                result_dict['PassError'] = "Such password already exists!"
            if not result_dict:
                User.objects.create(
                    full_name=request.POST['full_name'],
                    email=request.POST['email'],
                    password=request.POST['password'],
                    role_id='0')
                result_dict['Success'] = "true"
        else:
            result_dict['RulesError'] = "Error rules of input"
        return JsonResponse(result_dict)


def get_points(request, model_cls):
    """Returns entities with location within rectangle
    of sw and ne points. For more info on points look
    into similar methods of particular models
    mdl_cls - model class e.g. Place or SolenBike
    """

    def str_to_point(txt_point):
        return [float(x) for x in txt_point.split(',')]

    if request.method == 'GET':
        sw_point = str_to_point(request.GET.get('sw', '44.3, 37.2'))
        ne_point = str_to_point(request.GET.get('ne', '44.1, 37.4'))
        entities = model_cls.objects
        if sw_point[1] > ne_point[1]:
            entities = entities.filter(lng__lte=sw_point[1]).filter(lng__gte=ne_point[1])
        else:
            entities = entities.filter(lng__lte=ne_point[1]).filter(lng__gte=sw_point[1])
        # print entities
        if sw_point[0] > ne_point[0]:
            entities = entities.filter(lat__lte=sw_point[0]).filter(lat__gte=ne_point[0])
        else:
            entities = entities.filter(lat__lte=ne_point[0]).filter(lat__gte=sw_point[0])

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
