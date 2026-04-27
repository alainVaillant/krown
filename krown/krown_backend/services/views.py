from rest_framework import generics, permissions, viewsets
from .models import Service, ServiceRequest
from .serializers import ServiceSerializer, ServiceRequestSerializer

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all().order_by('-created_at')
    serializer_class = ServiceSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

class ServiceListView(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = (permissions.AllowAny,)

class ServiceRequestCreateView(generics.CreateAPIView):
    serializer_class = ServiceRequestSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserServiceRequestListView(generics.ListAPIView):
    serializer_class = ServiceRequestSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return ServiceRequest.objects.filter(user=self.request.user)
