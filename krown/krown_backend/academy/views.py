from rest_framework import generics, permissions, viewsets
from .models import Course, Enrollment, Lesson
from .serializers import CourseSerializer, EnrollmentSerializer, LessonSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all().order_by('-created_at')
    serializer_class = CourseSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

class LessonViewSet(viewsets.ModelViewSet):
    serializer_class = LessonSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        course_id = self.request.query_params.get('course')
        if course_id:
            return Lesson.objects.filter(course_id=course_id)
        return Lesson.objects.all()

class CourseListView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = (permissions.AllowAny,)

class EnrollmentCreateView(generics.CreateAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserEnrollmentListView(generics.ListAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Enrollment.objects.filter(user=self.request.user)

class LessonListView(generics.ListAPIView):
    serializer_class = LessonSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        course_id = self.request.query_params.get('course')
        return Lesson.objects.filter(course_id=course_id)
