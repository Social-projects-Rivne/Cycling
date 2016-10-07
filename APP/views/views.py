# -*- encoding: utf-8 -*-

import json

from django.shortcuts import render
from django.http import JsonResponse

from models.users import User

def index(request):
    context = {
        'message': "Привіт, світе! Ви на головній сторінці Рівненського велододатку.",
        }
    return render(request, 'APP/index.html', context)


def registraton(request):
	if request.method == "POST":
		post_data = json.load(request.body)
		User.objects.create(full_name=post_data['full_name'],
		                    email=post_data['email'], password=post_data['password'],
		                    role_id=post_data['0'])
	else:
		print "Method doesn't allowed"
		