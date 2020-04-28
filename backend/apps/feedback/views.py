from rest_framework import viewsets, permissions

from .serializers import FeedbackSerializer
from .models import Feedback


class FeedbackView(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = (permissions.IsAuthenticated,)



