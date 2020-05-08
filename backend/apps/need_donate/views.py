from rest_framework import viewsets

from .serializers import NeedDonateSerializer, TypeDonateSerializer
from .models import NeedDonate, TypeDonate
from apps.donates.permissions import *
from apps.base.models import Institution


class NeedDonateView(viewsets.ModelViewSet):
    queryset = NeedDonate.objects.all()
    serializer_class = NeedDonateSerializer

    def get_permissions(self):
        permission_classes = [permissions.IsAuthenticated]

        if self.action == 'update':
            permission_classes += [IsInstitution]
        elif self.action == 'create':
            permission_classes += [IsInstitution]
        else:
            permission_classes += [Nobody]

        return [permission() for permission in permission_classes]

    
    def perform_create(self, serializer):
        donator = self.request.user
        institution = Institution.objects.filter(owner=donator)[0]
        institution.need_donates.all().update(is_active=False)
        serializer.save(owner=donator, institution=institution)

    # permission_classes = (permissions.IsAuthenticated,)


class TypeDonateView(viewsets.ModelViewSet):
    queryset = TypeDonate.objects.all()
    serializer_class = TypeDonateSerializer
    # permission_classes = (permissions.IsAuthenticated,)

