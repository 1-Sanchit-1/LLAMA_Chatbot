from django.contrib import admin
from django.urls import path
from . import views

app_name = 'Chatbotapp'

urlpatterns = [
     path('home',views.home,name='home'),
     path('getResponse',views.getResponse,name='getResponse')
]
