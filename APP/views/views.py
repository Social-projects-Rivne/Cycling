# -*- encoding: utf-8 -*-

import json

from django.shortcuts import render
from django.http import JsonResponse


from APP.models import User

def index(request):
    context = {
        'message': "Привіт, світе! Ви на головній сторінці Рівненського велододатку.",
        }
    return render(request, 'APP/index.html', context)


def registration(request):
	if request.method == "POST":
		post_data = json.load(request.body)
		result_dict = dict()
		if User.objects.filter(full_name=post_data['full_name']).exists():
			result_dict['NameError'] = "Such full name already exists!"
		if User.objects.filter(email=post_data['email']).exists():
			result_dict['EmailError'] = "Such email already exists!"
		if User.objects.filter(password=post_data['password']).exists():
			result_dict['PassError'] = "Such password already exists!"
		if not result_dict:
			User.objects.create(full_name=post_data['full_name'],
		    	                email=post_data['email'], password=post_data['password'],
		        	            role_id=post_data['0'])
			result_dict['Success'] = "Your registration has been succesfully done"
		return JsonResponse(result_dict)
