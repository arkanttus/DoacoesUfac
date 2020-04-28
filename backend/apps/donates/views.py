from rest_framework import viewsets

from .serializers import (DonateSerializer, TypeDonateSerializer)
from .models import Donate, TypeDonate


class DonateView(viewsets.ModelViewSet):
    queryset = Donate.objects.all()
    serializer_class = DonateSerializer
    # permission_classes = (permissions.IsAuthenticated,)


class TypeDonateView(viewsets.ModelViewSet):
    queryset = TypeDonate.objects.all()
    serializer_class = TypeDonateSerializer
    # permission_classes = (permissions.IsAuthenticated,)

