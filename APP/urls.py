from django.conf.urls import url

from .views import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^v1/login$', views.login, name='login'),
    url(r'^v1/registration$', views.registration),
    url(r'^v1/places/search$', views.get_places_by_points, name='get_points'),
    url(r'^v1/parkings/search$', views.get_parkings_by_points, name='get_points'),
    url(r'^v1/stolen/search$', views.get_stolen_bikes_by_points, name='get_points'),
    url(r'^api/user_data/(?P<user_id>[0-9]+)/$', views.get_user_data, name='user_data'),
    url(r'^api/user_bikes_data/(?P<user_id>[0-9]+)/$', views.get_user_bikes_data, name='user_bikes_data'),
    url(r'^api/user_parkings_data/(?P<user_id>[0-9]+)/$', views.get_user_parkings_data, name='user_parkings_data'),
    url(r'^api/user_places_data/(?P<user_id>\d+)/$', views.get_user_places_data, name='user_places_data'),
    url(r'^', views.index, name='index'),
]
