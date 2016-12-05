# -*- coding: utf-8 -*-
"""This module provide JSON Parse error responses

Functions to use:

json_parse_error - return json parse error responce (obvious)
json_agr_missing - return json argument missing responce

"""
import logging

from django.http import JsonResponse


logger = logging.getLogger(__name__)


def json_parse_error():
    """Return JsonResponse with json parse error.

    Author: Olexii
    """
    logger.info("json parse error")
    return JsonResponse({"error": "Couldn`t parse data body.", "code": "100"})


def json_agr_missing(arg_name, error_code):
    """ Return given argument missing error.

    This method is shortcut for json response when
    some request key argument is missing.

    Arguments:
    arg_name - missing argument name.
    error_code - given missing argument error code.

    Author: Olexii
    """
    logger.info("missing argument error: %s", arg_name)
    return JsonResponse({
        "error": "".join(["Error, missing ", arg_name, " argument!"]),
        "code": error_code})
