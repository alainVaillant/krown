from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ServiceListView, ServiceRequestCreateView, UserServiceRequestListView, ServiceViewSet

router = DefaultRouter()
router.register('admin-manage', ServiceViewSet, basename='admin-service-manage')

urlpatterns = [
    path('', ServiceListView.as_view(), name='service-list'),
    path('request/', ServiceRequestCreateView.as_view(), name='service-request'),
    path('my-requests/', UserServiceRequestListView.as_view(), name='user-requests'),
    path('manage/', include(router.urls)),
]
