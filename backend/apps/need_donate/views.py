from rest_framework import viewsets

from .serializers import (NeedDonateSerializer, TypeDonateSerializer)
from .models import NeedDonate, TypeDonate


class NeedDonateView(viewsets.ModelViewSet):
    queryset = NeedDonate.objects.all()
    serializer_class = NeedDonateSerializer
    # permission_classes = (permissions.IsAuthenticated,)


class TypeDonateView(viewsets.ModelViewSet):
    queryset = TypeDonate.objects.all()
    serializer_class = TypeDonateSerializer
    # permission_classes = (permissions.IsAuthenticated,)

