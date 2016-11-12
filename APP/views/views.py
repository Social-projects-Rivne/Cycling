# -*- encoding: utf-8 -*-
import json

from django.shortcuts import render, redirect
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.http import JsonResponse, HttpResponse, Http404

from APP.utils.login_util import PasswordMaster
from APP.utils.json_parser import json_parse_error, json_agr_missing
from APP.models import (User, Bicycle, StolenBike, Parking, Place, Image,
                        Attachment)
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

def get_user_data(request, user_id):
    """Gets User data from db (except password column) and returns it
    as JsonResponse"""
    try:
        # what about to use .filter instead of .get? cause .values loads all
        # usrs and only then select from them pk=user_id.
        # think bout it, pls
        user_data = User.objects.values('full_name', 'email', 'is_active',
                                'avatar', 'role_id' ).get(pk=user_id)
        user_data['is_logged_in'] = True if user_data['email'] in request.session else False

    #except User.DoesNotExist:
    except User.DoesNotExist:
        # output message if usr doesn't exist. Or 404 if there is
        # attempt to visit page with this id.
        #  404!
        raise Http404("No user with such id in the database.")
    return JsonResponse(user_data)

def get_user_bikes_data(request, user_id):
    """Gets bicycles data from db using id and returns it as JsonResponse"""
    # retrieve only non deleted vehicles
    user_bikes_list = list(Bicycle.objects.filter(owner_id=user_id, is_deleted=False).values('id', 'name', 'description', 'owner_id'))
    # some stuff if db is unreachable
    # 500
    for bike in user_bikes_list:
        try:
            bike['images_urls'] = list(Image.objects.filter(bike_id=bike['id']).values('url'))
            if not bike['images_urls']:
                bike['images_urls'] = None
        except TypeError:
            bike['images_urls'] = None

    bike['is_stolen'] = StolenBike.objects.filter(bike_id=bike['id']).exists()
    return JsonResponse(user_bikes_list, safe = False)

def get_user_parkings_data(request, user_id):
    """Gets data from db about Parkings and their images from
    Attachments and output it as JsonResponse"""
    try:
        user_parks_list = list(Parking.objects.filter(owner_id=user_id).values())
    except:
        # some stuff if db is unreachable
        pass
    for parking in user_parks_list:
        try:
            parking['images_urls'] = list(Attachment.objects.filter(parking_id=parking['id'])).values('image_url')
            if not parking['images_urls']:
                parking['images_urls'] = None
        except:
            parking['images_urls'] = None
    return JsonResponse(user_parks_list, safe = False)

def get_user_places_data(request, user_id):
    """Gets data from db about user's Places and their images from
    Attachments and output it as JsonResponse."""
    try:
        user_places_list = list(Place.objects.filter(owner_id=user_id).values())
    except:
        # some stuff if db is unreachable
        pass
    for place in user_places_list:
        try:
            place['images_url'] = list(Attachment.objects.filter(place_id=place['id']).values('image_url'))
            if not place['image_url']:
                place['image_url'] = None
        except:
            place['image_url'] = None
    return JsonResponse(user_places_list, safe = False)

def edit_user_data(request, user_id):
    """Accept POST request for user data changes and then updates these changes
    in the database."""
    user = User.objects.get(pk=user_id)
    user.full_name = request.POST['full_name']
    user.save()
    return redirect('/user/%s/' % user_id)
