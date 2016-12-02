# -*- encoding: utf-8 -*-
"""Contains index() view for returning index.html"""
from django.shortcuts import render

def index(request):
    """Gives the base html page with ReactJS application"""

    context = {
        'message': "Welcome to Rivne Cycling",
        }
    return render(request, 'APP/index.html', context)
