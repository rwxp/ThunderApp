from django.urls import path
from ThunderApp.views import UsersView
from ThunderApp.views import BillsView

urlpatterns=[
    path('users/', UsersView.as_view(), name="users"),
    path('users/<int:id>', UsersView.as_view(), name="user"),
    path('bills/', BillsView.as_view(), name="bills"),
    path('bills/<int:id>', BillsView.as_view(), name="bill"),
    path('users/verifyUser', UsersView.verifyUser, name="verify"),
]