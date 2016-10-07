# -*- encoding: utf-8 -*-

from django.shortcuts import render

def index(request):
    context = {
        'message': "Привіт, світе! Ви на головній сторінці Рівненського велододатку.",
        }
    return render(request, 'APP/index.html', context)


@require_http_methods(['POST'])
def login(request):
    email = request.POST.get("email")
    password = request.POST.get("password")
    