from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MentorshipProgramListView, MentorshipApplicationCreateView, MentorshipProgramViewSet

router = DefaultRouter()
router.register('admin-manage', MentorshipProgramViewSet, basename='admin-mentorship-manage')

urlpatterns = [
    path('', MentorshipProgramListView.as_view(), name='mentorship-list'),
    path('apply/', MentorshipApplicationCreateView.as_view(), name='mentorship-apply'),
    path('manage/', include(router.urls)),
]
