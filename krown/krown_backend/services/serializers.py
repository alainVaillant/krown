from rest_framework import serializers
from .models import Service, ServiceRequest

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

class ServiceRequestSerializer(serializers.ModelSerializer):
    service_details = ServiceSerializer(source='service', read_only=True)
    class Meta:
        model = ServiceRequest
        fields = ('id', 'user', 'service', 'service_details', 'message', 'status', 'created_at')
        read_only_fields = ('user', 'status', 'created_at')
