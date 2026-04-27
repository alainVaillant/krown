from django.urls import path
from .views import MentorshipProgramListView, MentorshipApplicationCreateView

urlpatterns = [
    path('', MentorshipProgramListView.as_view(), name='mentorship-list'),
    path('apply/', MentorshipApplicationCreateView.as_view(), name='mentorship-apply'),
]
