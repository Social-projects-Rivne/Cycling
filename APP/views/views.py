# -*- encoding: utf-8 -*-

import json

from django.core import serializers
from django.http import HttpResponse
from django.shortcuts import render
from django.http import JsonResponse

from APP.models import User
from APP.utils.validator import Validator

_valid_inputs = Validator()

from APP.models.parkings import Parking
from APP.models.places import Place
from APP.models.stolen_bikes import StolenBike


def index(request):
    context = {
        'message': "Привіт, світе! Ви на головній сторінці Рівненського велододатку.",
        }
    return render(request, 'APP/index.html', context)

def registration(request):
	if request.method == "POST":
		post_data = json.load(request.body)
		result_dict = dict()
		obj_filter = User.objects.filter()	
		if _valid_inputs.full_name_validation(post_data['full_name'])\
	    	and _valid_inputs.email_validation(post_data['email']):
			if obj_filter(full_name=post_data['full_name']).exists():
				result_dict['NameError'] = "Such full name already exists!"
			if obj_filter(email=post_data['email']).exists():
				result_dict['EmailError'] = "Such email already exists!"
			if obj_filter(password=post_data['password']).exists():
				result_dict['PassError'] = "Such password already exists!"
			if not result_dict:
				User.objects.create(full_name=post_data['full_name'],
		    		                email=post_data['email'], password=post_data['password'],
		        		            role_id=post_data['0'])
				result_dict['Success'] = "Your registration has been succesfully done"
		else:
			result_dict['RulesError'] = "Error rules of input"
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
