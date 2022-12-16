from django.urls import path
from ThunderApp.views import UsersView

urlpatterns=[
    path('users/', UsersView.as_view(), name="users"),
    path('users/<int:id>', UsersView.as_view(), name="user")
]