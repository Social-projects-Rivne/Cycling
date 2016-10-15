from django.conf.urls import url

from .views import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^v1/login$', views.login, name='login')
]
