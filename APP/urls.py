from django.conf.urls import url

from .views import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^login$', views.login, name='login'),
    url(r'^registration$', views.registration),
    url(r'^places/search$', views.get_places_by_points, name='get_places_by_points'),
    url(r'^places/create$', views.create_place, name='create_place'),
    url(r'^parkings/search$', views.get_parkings_by_points, name='get_parkings_by_points'),
    url(r'^parkings/create$', views.create_parking, name='create_parking'),
    url(r'^stolen/search$', views.get_stolen_bikes_by_points, name='get_stolen_bikes_by_points'),
    url(r'^stolen/create$', views.create_stolen, name='create_stolen'),
    url(r'^', views.index, name='index'),
]
