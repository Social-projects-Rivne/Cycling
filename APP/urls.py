from django.conf.urls import url

from .views import index, auth, points, place, parking, stolen_bike, user,\
                   bike, stolen_all

urlpatterns = [
    url(r'^login$', auth.login, name='login'),
    url(r'^registration$', auth.registration),
    url(r'^marker_details$', points.marker_details),
    url(r'^edit_marker_details$', points.edit_marker_details),
    url(r'^places/search$', points.get_places_by_points, name='get_places_by_points'),
    url(r'^places/create$', place.create_place, name='create_place'),
    url(r'^parkings/search$', points.get_parkings_by_points, name='get_parkings_by_points'),
    url(r'^parkings/create$', parking.create_parking, name='create_parking'),
    url(r'^stolen/search$', points.get_stolen_bikes_by_points, name='get_stolen_bikes_by_points'),
    url(r'^stolen/all$', stolen_all.get, name='get_stolen_all'),
    url(r'^stolen/create$', stolen_bike.create_stolen, name='create_stolen'),
    url(r'^bike/create$', bike.create, name='create_bike'),
    url(r'^bike/(?P<bike_id>[0-9]+)/$', bike.by_id, name='get_bike'),
    url(r'^bike/edit$', bike.edit, name='edit_bike'),
    url(r'^bike/delete$', bike.delete, name='delete_bike'),
    url(r'^tokenvalid$', user.check_token, name='check_token'),
    url(r'^categories$', points.get_categories, name='get_categories'),
    url(r'^avatar$', user.get_avatar, name='get_avatar'),
    url(
        r'^user_data/(?P<user_id>[0-9]+)/$',
        user.get_user_data,
        name='user_data'
    ),
    url(
        r'^edit_user_data/(?P<user_id>[0-9]+)/$',
        user.edit_user_data,
        name='edit_user_data'
    ),
    url(
        r'^user_bikes_data/(?P<user_id>[0-9]+)/$',
        user.get_user_bikes_data,
        name='user_bikes_data'
    ),
    url(
        r'^user_parkings_data/(?P<user_id>[0-9]+)/$',
        user.get_user_parkings_data,
        name='user_parkings_data'
    ),
    url(
        r'^user_places_data/(?P<user_id>\d+)/$',
        user.get_user_places_data,
        name='user_places_data'
    ),
    url(r'^', index.index, name='index'),
]
