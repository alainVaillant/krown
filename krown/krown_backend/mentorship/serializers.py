from rest_framework import serializers
from .models import MentorshipProgram, MentorshipApplication

class MentorshipProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorshipProgram
        fields = '__all__'

class MentorshipApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorshipApplication
        fields = '__all__'
        read_only_fields = ('user', 'status', 'created_at')
