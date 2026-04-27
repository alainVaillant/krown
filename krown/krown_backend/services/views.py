from rest_framework import generics, permissions
from .models import Service, ServiceRequest
from .serializers import ServiceSerializer, ServiceRequestSerializer

class ServiceListView(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = (permissions.AllowAny,)

class ServiceRequestCreateView(generics.CreateAPIView):
    serializer_class = ServiceRequestSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
