# -*- encoding: utf-8 -*-
import json

from django.core import serializers
from django.http import HttpResponse, JsonResponse, Http404
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt

from APP.utils.login_util import PasswordMaster
from APP.utils.json_parser import json_parse_error, json_agr_missing

from APP.models import User, Bicycle, StolenBike, Parking, Place, Image, Attachment
#from APP.models.parkings import Parking
#from APP.models.places import Place
#from APP.models.stolen_bikes import StolenBike
from APP.utils.validator import Validator

_valid_inputs = Validator()
_password_master = PasswordMaster()

def index(request):
    context = {
        'message': "Привіт, світе! Ви на головній сторінці Рівненського велододатку.",
        }
    return render(request, 'APP/index.html', context)


@csrf_exempt
@require_http_methods(['POST'])
def login(request):

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
        result_dict = dict()
        obj_filter = User.objects.filter
        if _valid_inputs.full_name_validation(request.POST['full_name'])\
            and _valid_inputs.email_validation(request.POST['email']):
            if obj_filter(full_name=request.POST["full_name"]).exists():
                result_dict['NameError'] = 1
            if obj_filter(email=request.POST["email"]).exists():
                result_dict['EmailError'] = 1
            if obj_filter(password=request.POST["password"]).exists():
                result_dict['PassError'] = 1
            if not result_dict:
                User.objects.create(full_name=request.POST['full_name'],
                                    email=request.POST['email'], password=request.POST['password'],
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
    try:
        # retrieve only non deleted vehicles
        user_bikes_list = list(Bicycle.objects.filter(owner_id=user_id, is_deleted=False).values('id', 'name', 'description', 'owner_id'))
    except:
        # some stuff if db is unreachable
        # 500
        pass
    for bike in user_bikes_list:
        try:
            bike['images_urls'] = list(Image.objects.filter(bike_id=bike['id']).values('url'))
            if not bike['images_urls']:
                bike['images_urls'] = None
        except TypeError:
            bike['images_urls'] = None

        try:
            bike['is_stolen'] = StolenBike.objects.filter(bike_id=bike['id']).exists()
        except:
            # some shit
            pass
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
