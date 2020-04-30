from rest_framework import viewsets, permissions

from .serializers import DonateSerializer
from .models import Donate


class DonateView(viewsets.ModelViewSet):
    queryset = Donate.objects.all()
    serializer_class = DonateSerializer
    permission_classes = (permissions.AllowAny, )



