# -*- encoding: utf-8 -*-
"""Contains views relaited to User model"""
import json
import logging

from django.http import JsonResponse, Http404

from APP.models import (User, Bicycle, StolenBike, Parking, Place, Image,
                        Attachment)
from APP.utils.need_token import need_token


logger = logging.getLogger(__name__)

def get_user_data(request, user_id):
    """Get User data from db (except password column) and return it
    as JsonResponse.

    Sample of JSON response:
    {
        id: 102, is_active: true, role_id: "0", is_logged_in: false,
        full_name: "John Doe", email: "ekim0@ox.ac.uk",
        avatar: "http://img.com/img.jpeg"
    }

    Author: Mykola Radionov
    """
    try:
        user_data = User.objects.values(
            'id',
            'full_name',
            'email',
            'is_active',
            'avatar',
            'role_id'
        ).get(pk=user_id)
        logger.debug("""Get request for user data at /api/user_data/%s
                     and successfully replied with JSON""" % user_id)
    except User.DoesNotExist:
        logger.error(
            """Get request for user data at /api/user_data/%(uid)s
            but user with id %(uid)s doesn't exist.""" % {"uid": user_id}
        )
        raise Http404("No user with such id in the database.")


    return JsonResponse(user_data)


def get_user_bikes_data(request, user_id):
    """Get bicycles data from db using id and return it as JsonResponse.

    Sample of JSON response (an array of two bike objects):
    [
        {
            "description":"My childhood bike","name":"Visine A",
            "images_urls":[{"url":"http://road.cc/img.jpg"}],
            "is_stolen":true,
            "id":55,"owner_id":2,"index":0
        },
        {
            "description":"My new bike",
            "name":"Tamsulosin Hydrochloride",
            "images_urls":[
                {"url":"http://bikes.com/1.jpg"},
                {"url":"http://bikes.com/2.jpg"}
            ],
            "is_stolen":false,"id":84,"owner_id":2,"index":1
        }
    ]

    Author: Mykola Radionov
    """
    user_active_bikes_list = list(Bicycle.objects.filter(
        owner_id=user_id, is_deleted=False
    ).values('id', 'name', 'description', 'owner_id'))

    for bike in user_active_bikes_list:
        try:
            bike['images_urls'] = list(Image.objects.filter(
                bike_id=bike['id']
            ).values('url'))

            if not bike['images_urls']:
                bike['images_urls'] = None
        except TypeError:
            bike['images_urls'] = None
        bike['is_stolen'] = StolenBike.objects.filter(
            bike_id=bike['id']
        ).exists()
        logger.debug("""Get request for user bikes data at
                     /api/user_bikes_data/%s and successfully
                     replied with JSON""" % user_id)
    return JsonResponse(user_active_bikes_list, safe=False)


def get_user_parkings_data(request, user_id):
    """Get data from db about Parkings and their images from
    Attachments and output it as JsonResponse

    Sample of JSON response (an array of two parkings objects):
    [
        {
            "name":"4788 Heath Avenue","is_free":false,"id":7,
            "images_urls":null,"amount":2,"lat":"50.624000",
            "lng":"26.212300","security":"0","owner_id":1
        },
        {
            "name":"88303 Pine View Alley","is_free":false,
            "id":95,"images_urls": [{"url":"http://spot.cc/img.jpg"}],
            "amount":7,"lat":"50.609000","lng":"26.220500",
            "security":"1","owner_id":1
        }
    ]

    Author: Mykola Radionov
    """
    user_parks_list = list(Parking.objects.filter(owner_id=user_id).values())

    for parking in user_parks_list:
        try:
            parking['images_urls'] = list(Attachment.objects.filter(
                parking_id=parking['id']
            ).values('image_url'))

            if not parking['images_urls']:
                parking['images_urls'] = None
        except TypeError:
            parking['images_urls'] = None
        logger.debug("""Get request for user parkings data at
                     /api/user_parkings_data/%s and successfully
                     replied with JSON""" % user_id)
    return JsonResponse(user_parks_list, safe=False)


def get_user_places_data(request, user_id):
    """Get data from db about user's Places and their images from
    Attachments and return it as JsonResponse.

    Sample of JSON response (an array of two places objects):
    [
        {
            "description":"The best place in the world","owner_id":1,
            "images_urls":null,"from_hour":9,"to_hour":20,
            "lat":"50.618000","lng":"26.218300","category_id":"1",
            "id":50,"name":"Latlux"
        },
        {
            "description":"You regret that have never been here",
            "owner_id":1,
            "images_urls":[{"url":"http://plc.cc/img.jpg"}],
            "from_hour":11,"to_hour":17,"lat":"50.612000",
            "lng":"26.218300","category_id":"0","id":63,
            "name":"Mat Lam Tam"
        }
    ]

    Author: Mykola Radionov
    """
    user_places_list = list(Place.objects.filter(owner_id=user_id).values())
    for place in user_places_list:
        try:
            place['images_urls'] = list(Attachment.objects.filter(
                place_id=place['id']
            ).values('image_url'))

            if not place['images_urls']:
                place['images_urls'] = None
        except TypeError:
            place['images_urls'] = None
        logger.debug("""Get request for user places data at
                     /api/user_places_data/%s and successfully
                     replied with JSON""" % user_id)
    return JsonResponse(user_places_list, safe=False)


@need_token
def edit_user_data(request, user_id):
    """Accept POST request for user data changes and then update these
    changes in the database.

    It is expected that with POST will come JSON with full_name and
    avatar_url

    Author: Mykola Radionov
    """
    data = json.loads(request.body)
    user = User.objects.get(pk=user_id)
    user.full_name = data.get('full_name')
    user.avatar = data.get('avatar_url')
    user.save()
    logger.debug("""Get POST method for changes in user data at
                 /api/edit_user_data/%s and successfully did it""" % user_id)
    return JsonResponse({'status': 'ok'})


@need_token
def get_avatar(request):
    """Return avatar by user token.

    This function accept token as parameter and return avatar
    or default picture if there is no avatar.

    Author: Olexii
    """
    if request.user.avatar:
        result = request.user.avatar
    else:
        result = "".join(["https://cdn1.iconfinder.com/",
                          "data/icons/logotypes/32/twitter-128.png"])

    return JsonResponse({"result": {"avatar": result}})


@need_token
def check_token(request):
    """This function just return OK if token is valid

    Author: Olexii
    """
    return JsonResponse({"result": "ok"})
