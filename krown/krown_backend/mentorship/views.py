from rest_framework import generics, permissions
from .models import MentorshipProgram, MentorshipApplication
from .serializers import MentorshipProgramSerializer, MentorshipApplicationSerializer

class MentorshipProgramListView(generics.ListAPIView):
    queryset = MentorshipProgram.objects.all()
    serializer_class = MentorshipProgramSerializer
    permission_classes = (permissions.AllowAny,)

class MentorshipApplicationCreateView(generics.CreateAPIView):
    serializer_class = MentorshipApplicationSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
