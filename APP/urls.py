from django.conf.urls import url

from .views import views

urlpatterns = [
    url(r'^login$', views.login, name='login'),
    url(r'^registration$', views.registration),
    url(r'^marker_details$', views.marker_details),
    url(r'^places/search$', views.get_places_by_points, name='get_places_by_points'),
    url(r'^places/create$', views.create_place, name='create_place'),
    url(r'^parkings/search$', views.get_parkings_by_points, name='get_parkings_by_points'),
    url(r'^parkings/create$', views.create_parking, name='create_parking'),
    url(r'^stolen/search$', views.get_stolen_bikes_by_points, name='get_stolen_bikes_by_points'),
    url(r'^stolen/create$', views.create_stolen, name='create_stolen'),
    url(r'^tokenvalid$', views.check_token, name='check_token'),
    url(r'^categories$', views.get_categories, name='get_categories'),
    url(r'^avatar$', views.get_avatar, name='get_avatar'),
    url(r'^user_data/(?P<user_id>[0-9]+)/$', views.get_user_data, name='user_data'),
    url(r'^edit_user_data/(?P<user_id>[0-9]+)/$', views.edit_user_data, name='edit_user_data'),
    url(r'^user_bikes_data/(?P<user_id>[0-9]+)/$', views.get_user_bikes_data, name='user_bikes_data'),
    url(r'^user_parkings_data/(?P<user_id>[0-9]+)/$', views.get_user_parkings_data, name='user_parkings_data'),
    url(r'^user_places_data/(?P<user_id>\d+)/$', views.get_user_places_data, name='user_places_data'),
    url(r'^', views.index, name='index'),
]
