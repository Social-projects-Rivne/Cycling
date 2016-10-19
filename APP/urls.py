from django.conf.urls import url

from .views import views

urlpatterns = [
    url(r'^v1/login$', views.login, name='login'),
    url(r'^v1/registration$', views.registration),
    url(r'^v1/places/search$', views.get_places_by_points, name='get_places'),
    url(r'^v1/parkings/search$', views.get_parkings_by_points, name='get_parkings'),
    url(r'^v1/stolen/search$', views.get_stolen_bikes_by_points, name='get_stolen'),
    url(r'^', views.index, name='index'),
]
