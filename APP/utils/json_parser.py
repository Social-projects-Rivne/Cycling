"""
This module provide JSON Parse error response
"""
import logging

from django.http import JsonResponse


def json_parse_error():
    """
    Return JsonResponse with error
    """
    logger.info("json parse error")
    return JsonResponse({"error": "Couldn`t parse data body.", "code": "100"})


def json_agr_missing(arg_name, error_code):
    """
    This method is shortcut for json response when
    some key argument is missing
    """
    logger.info("missing argument error: %s", arg_name)
    return JsonResponse({
        "error": "".join(["Error, missing ", arg_name, " argument!"]),
        "code": error_code})
