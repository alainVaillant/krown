from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseListView, EnrollmentCreateView, UserEnrollmentListView, CourseViewSet, LessonListView, LessonViewSet

router = DefaultRouter()
router.register('admin-manage', CourseViewSet, basename='admin-course-manage')
router.register('admin-lessons', LessonViewSet, basename='admin-lesson-manage')

urlpatterns = [
    path('', CourseListView.as_view(), name='course-list'),
    path('enroll/', EnrollmentCreateView.as_view(), name='course-enroll'),
    path('my-enrollments/', UserEnrollmentListView.as_view(), name='user-enrollments'),
    path('lessons/', LessonListView.as_view(), name='lesson-list'),
    path('manage/', include(router.urls)),
]
