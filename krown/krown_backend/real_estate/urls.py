from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyListView, PropertyViewSet

router = DefaultRouter()
router.register('admin-manage', PropertyViewSet, basename='admin-property-manage')

urlpatterns = [
    path('', PropertyListView.as_view(), name='property-list'),
    path('manage/', include(router.urls)),
]
