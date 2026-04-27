from rest_framework import generics, permissions
from .models import Post
from .serializers import PostSerializer

class PostListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (permissions.AllowAny,)
