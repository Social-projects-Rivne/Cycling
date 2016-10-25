from django.conf.urls import url

from .views import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^login$', views.login, name='login'),
    url(r'^registration$', views.registration),
    url(r'^marker_details$', views.marker_details),
    url(r'^places/search$', views.get_places_by_points, name='get_points'),
    url(r'^parkings/search$', views.get_parkings_by_points, name='get_points'),
    url(r'^stolen/search$', views.get_stolen_bikes_by_points, name='get_points'),
    url(r'^', views.index, name='index'),
]
