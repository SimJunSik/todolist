from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index),
    path('show_list/', views.index),
    path('add_item/', views.add_item),
    path('modify_item/<int:todoitem_id>/', views.modify_item),

    path('delete_todoitem/<int:todoitem_id>/', views.delete_todoitem),
    path('finish_todoitem/<int:todoitem_id>/', views.finish_todoitem),
    path('unfinish_todoitem/<int:todoitem_id>/', views.unfinish_todoitem),
]
