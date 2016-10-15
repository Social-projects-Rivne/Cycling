# -*- encoding: utf-8 -*-
import json

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt

#from ..models import *
#from ..utils.login_util import PasswordMaster
#from ..utils.json_parser import json_parse_error, json_agr_missing


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


@need_token
def wrapped(request):
    print request
