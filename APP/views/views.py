# -*- encoding: utf-8 -*-
import json
from datetime import datetime

from django.http import JsonResponse, HttpResponseBadRequest , HttpResponseServerError
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
from APP.models.bicycles import Bicycle

_valid_inputs = Validator()
_password_master = PasswordMaster()

def index(request):
    context = {
        'message': "Привіт, світе! Ви на головній сторінці Рівненського велододатку.",
        }
    return render(request, 'APP/index.html', context)


@csrf_exempt
def login(request):
    print request.body
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

    if _password_master.check_password(data['password'], user.password):
        user.token = _password_master.generate_token()
    else:
        return JsonResponse({"error": "Invalid password!"})

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


def marker_details(request):
    pass

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

# @need_token
def create_place(request):
    """Creates new Place object in DB

    The url is built like this:
    https://cycling.com/api/place/create
    it's a POST request
    """
    if request.method != 'POST':
        return HttpResponseBadRequest(content='Expected POST')
    kwargs = {}
    kwargs['name'] = request.POST.get('name', None)
    if kwargs['name'] is None:
        return HttpResponseBadRequest(content='There should be "name" field')
    try:
        kwargs['lat'] = float(request.POST.get('lat', None))
    except (TypeError, ValueError):
        return HttpResponseBadRequest(content='Lattitude value is invalid')
    try:
        kwargs['lng'] = float(request.POST.get('lng', None))
    except (TypeError, ValueError):
        return HttpResponseBadRequest(content='Longitude value is invalid')
    kwargs['description'] = request.POST.get('description', None)
    try:
        kwargs['from_hour'] = int(request.POST.get('from_hour', None))
    except (TypeError, ValueError):
        kwargs['from_hour'] = None
    try:
        kwargs['to_hour'] = int(request.POST.get('to_hour', None))
    except (TypeError, ValueError):
        kwargs['to_hour'] = None
    try:
        kwargs['category_id'] = int(request.POST.get('category_id', 2))
    except (TypeError, ValueError):
        kwargs['category_id'] = 2
    kwargs['owner'] = User.objects.get(token=request.POST['token'])
    try:
        place = Place.objects.create(**kwargs)
        data = serializers.serialize("json", [place,])
        return HttpResponse(data, content_type="application/json")
    except Exception as e:
        return HttpResponseServerError(content=str(e))

# @need_token
def create_parking(request):
    """Creates new Parking object in DB

    The url is built like this:
    https://cycling.com/api/parking/create
    it's a POST request
    """
    if request.method != 'POST':
        return HttpResponseBadRequest(content='Expected POST')
    kwargs = {}
    kwargs['name'] = request.POST.get('name', None)
    if kwargs['name'] is None:
        return HttpResponseBadRequest(content='There should be "name" field')
    try:
        kwargs['lat'] = float(request.POST.get('lat', None))
    except (TypeError, ValueError):
        return HttpResponseBadRequest(content='Lattitude value is invalid')
    try:
        kwargs['lng'] = float(request.POST.get('lng', None))
    except (TypeError, ValueError):
        return HttpResponseBadRequest(content='Longitude value is invalid')
    try:
        kwargs['security'] = int(request.POST.get('security', None))
    except (TypeError, ValueError):
        kwargs['security'] = None
    try:
        kwargs['amount'] = int(request.POST.get('amount', None))
    except (TypeError, ValueError):
        kwargs['amount'] = None
    try:
        kwargs['is_free'] = int(request.POST.get('is_free', None))
    except (TypeError, ValueError):
        kwargs['is_free'] = None
    kwargs['owner'] = User.objects.get(token=request.POST['token'])
    try:
        parking = Parking.objects.create(**kwargs)
        data = serializers.serialize("json", [parking,])
        return HttpResponse(data, content_type="application/json")
    except Exception as e:
        return HttpResponseServerError(content=str(e))

# @need_token
def create_stolen(request):
    """Creates new StolenBike object in DB

    The url is built like this:
    https://cycling.com/api/stolen/create
    it's a POST request
    """
    if request.method != 'POST':
        return HttpResponseBadRequest(content='Expected POST')
    kwargs = {}
    try:
        kwargs['lat'] = float(request.POST.get('lat', None))
    except (TypeError, ValueError):
        return HttpResponseBadRequest(content='Lattitude value is invalid')
    try:
        kwargs['lng'] = float(request.POST.get('lng', None))
    except (TypeError, ValueError):
        return HttpResponseBadRequest(content='Longitude value is invalid')
    kwargs['description'] = request.POST.get('description', None)
    try:
        kwargs['day'] = datetime.strptime(request.POST.get('day', None), "").date()
    except (TypeError, ValueError):
        return HttpResponseBadRequest(content='The date of the event is invalid')
    try:
        kwargs['is_found'] = bool(request.POST.get('is_found', None))
    except (TypeError, ValueError):
        kwargs['is_found'] = None
    try:
        kwargs['bike'] = int(request.POST.get('bike', None))
    except (TypeError, ValueError):
        return HttpResponseBadRequest(content='The bicycle ID is invalid')
    kwargs['bike'] = Bicycle.objects.get(pk=kwargs['bike'])
    try:
        stolen = StolenBike.objects.create(**kwargs)
        data = serializers.serialize("json", [stolen,])
        return HttpResponse(data, content_type="application/json")
    except Exception as e:
        return HttpResponseServerError(content=str(e))