from rest_framework import generics, permissions, viewsets
from .models import MentorshipProgram, MentorshipApplication
from .serializers import MentorshipProgramSerializer, MentorshipApplicationSerializer

class MentorshipProgramViewSet(viewsets.ModelViewSet):
    queryset = MentorshipProgram.objects.all().order_by('-created_at')
    serializer_class = MentorshipProgramSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

class MentorshipProgramListView(generics.ListAPIView):
    queryset = MentorshipProgram.objects.all()
    serializer_class = MentorshipProgramSerializer
    permission_classes = (permissions.AllowAny,)

class MentorshipApplicationCreateView(generics.CreateAPIView):
    serializer_class = MentorshipApplicationSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
