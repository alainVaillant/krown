from rest_framework import serializers
from .models import Course, Enrollment, Lesson

class CourseSerializer(serializers.ModelSerializer):
    thumbnail = serializers.ImageField(required=False, allow_null=True)
    class Meta:
        model = Course
        fields = '__all__'

class EnrollmentSerializer(serializers.ModelSerializer):
    course_details = CourseSerializer(source='course', read_only=True)
    class Meta:
        model = Enrollment
        fields = ('id', 'user', 'course', 'course_details', 'progress', 'enrolled_at')
        read_only_fields = ('user', 'progress', 'enrolled_at')

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'
