from rest_framework import generics, permissions
from .models import Property
from .serializers import PropertySerializer

class PropertyListView(generics.ListAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = (permissions.AllowAny,)
