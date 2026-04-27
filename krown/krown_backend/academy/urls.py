from django.urls import path
from .views import CourseListView, EnrollmentCreateView

urlpatterns = [
    path('', CourseListView.as_view(), name='course-list'),
    path('enroll/', EnrollmentCreateView.as_view(), name='course-enroll'),
]
