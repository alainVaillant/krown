from django.urls import path
from .views import ServiceListView, ServiceRequestCreateView

urlpatterns = [
    path('', ServiceListView.as_view(), name='service-list'),
    path('request/', ServiceRequestCreateView.as_view(), name='service-request'),
]
