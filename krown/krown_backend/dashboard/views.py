from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from accounts.models import User
from services.models import ServiceRequest
from academy.models import Enrollment
from real_estate.models import Property

class AdminStatsView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        data = {
            "total_users": User.objects.count(),
            "total_requests": ServiceRequest.objects.count(),
            "pending_requests": ServiceRequest.objects.filter(status='pending').count(),
            "total_enrollments": Enrollment.objects.count(),
            "total_properties": Property.objects.count(),
            "recent_requests": ServiceRequest.objects.order_by('-created_at')[:5].values(
                'id', 'user__username', 'service__title', 'status', 'created_at'
            )
        }
        return Response(data)
