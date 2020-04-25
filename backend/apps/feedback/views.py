from rest_framework import response, status, viewsets, views, permissions, generics
from django.utils.translation import gettext_lazy as _

from .serializers import FeedbackSerializer
from .models import Feedback

class FeedbackView(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    #permission_classes = (permissions.IsAuthenticated,)



