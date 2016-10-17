"""
This module provide JSON Parse error response
"""
from django.http import JsonResponse


def json_parse_error():
    """
    Return JsonResponse with error
    """
    return JsonResponse({"error": "Couldn`t parse data body."})


def json_agr_missing(agr_name):
    """
    This method is shortcut for json response where
    some key argument is missing
    """
    return JsonResponse({
        "error": "".join(["Error, missing ", agr_name, " argument!"])})
