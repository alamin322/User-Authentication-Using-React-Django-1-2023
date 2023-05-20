from django.urls import path
from . import views

urlpatterns = [
    path('api/signup/', views.signup_view, name='signup'),
    path('api/signin/', views.signin_view, name='signin'),
    path('api/signout/', views.signout_view, name='signout'),
]
