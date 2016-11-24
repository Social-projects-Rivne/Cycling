# -*- encoding: utf-8 -*-

"""Contains views relaited to User model"""

import json

from django.http import JsonResponse, Http404

from APP.models import (User, Bicycle, StolenBike, Parking, Place, Image,
                        Attachment)
from APP.utils.need_token import need_token

def get_user_data(request, user_id):
    """Gets User data from db (except password column) and returns it
    as JsonResponse
    { is_active: true, role_id: "0", is_logged_in: false,
    full_name: "John Doe", email: "ekim0@ox.ac.uk",
    avatar: "http://road.cc/sites/default/files/…" }
    """
    try:
        # what about to use .filter instead of .get? cause .values loads all
        # usrs and only then select from them pk=user_id.
        # think bout it, pls
        user_data = User.objects.values('full_name', 'email', 'is_active',
                                        'avatar', 'role_id').get(pk=user_id)
        user_data['is_logged_in'] = True if user_data['email'] in request.session else False

    # except User.DoesNotExist:
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
    Attachments and output it as JsonResponse.

    """
    try:
        user_places_list = list(Place.objects.filter(owner_id=user_id).values())
    except:
        # some stuff if db is unreachable
        pass
    for place in user_places_list:
        try:
            place['images_urls'] = list(Attachment.objects.filter(place_id=place['id']).values('image_url'))
            if not place['images_urls']:
                place['images_urls'] = None
        except:
            place['images_urls'] = None
    return JsonResponse(user_places_list, safe = False)

@need_token
def edit_user_data(request, user_id):
    """Accept POST request for user data changes and then updates these
    changes in the database."""
    data = json.loads(request.body)
    user = User.objects.get(pk=user_id)
    user.full_name = data.get('full_name')
    user.avatar = data.get('avatar_url')
    user.save()
    return JsonResponse({'status': 'ok'})

@need_token
def get_avatar(request):
    """
    This function accept token as parameter and return avatar
    or default picture if there is no avatar
    """
    if request.user.avatar:
        result = request.user.avatar
    else:
        result = "".join(["https://cdn1.iconfinder.com/",
                          "data/icons/logotypes/32/twitter-128.png"])

    return JsonResponse({"result": {"avatar": result}})

@need_token
def check_token(request):
    """
    This function just return OK if token is valid
    """
    return JsonResponse({"result": "ok"})
