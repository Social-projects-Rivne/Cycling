# -*- encoding: utf-8 -*-
"""Contains registration and login methods"""

import json
import logging

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from APP.utils.password_master import PasswordMaster
from APP.utils.json_parser import json_parse_error, json_agr_missing
from APP.models import User
from APP.utils.validator import Validator
from APP.utils.log_util import log_request


VALID_INPUTS = Validator()
PASSWORD_MASTER = PasswordMaster()
_logger = logging.getLogger(__name__)

@csrf_exempt
def login(request):
    """Login request handler.

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
      101 - missing email
      102 - missing password
      103 - missing user with specified email
      104 - invalid password

    Author: Olexii
    """
    _logger.info("login request")
    log_request(request, _logger)
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

    if PASSWORD_MASTER.check_password(data['password'], user.password):
        user.token = PASSWORD_MASTER.generate_token()
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
    """Registration request handler

    Receive json with user credentials,
    validate and in case of success add user
    with that credentials to database
    and return json with success
    or error in case of error.

    Author: Dennys
    """
    if request.method == "POST":
        result_dict = dict()
        if VALID_INPUTS.full_name_validation(request.POST['full_name']) and \
           VALID_INPUTS.email_validation(request.POST['email']) and \
           VALID_INPUTS.password_validation(request.POST['password']):
            if User.objects.filter(email=request.POST["email"]).exists():
                result_dict['EmailError'] = 1
            if not result_dict:
                hashed_password = PASSWORD_MASTER.hash_password(
                    request.POST['password'])
                token = PASSWORD_MASTER.generate_token()
                User.objects.create(
                    full_name=request.POST['full_name'],
                    email=request.POST['email'],
                    password=hashed_password,
                    role_id='0', token=token)
                result_dict['Success'] = 1
        else:
            result_dict['RulesError'] = 1
        return JsonResponse(result_dict)
