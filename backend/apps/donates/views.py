from rest_framework import viewsets, permissions

from .serializers import DonateSerializer, DonateUpdateSerializer
from .models import Donate
from .permissions import *

from apps.base.models import Institution
from apps.users.models import User

class DonateView(viewsets.ModelViewSet):
    queryset = Donate.objects.all()
    serializer_class = DonateSerializer

    def get_permissions(self):
        permission_classes = [permissions.IsAuthenticated]

        if self.action == 'update':
            permission_classes += [IsInstitution]
        elif self.action == 'create':
            permission_classes += [IsDonator]
        elif self.action == 'retrieve':
            permission_classes += [IsRelated]
        else:
            permission_classes += [IsRelated]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        user = self.request.user
        if user.type_user == User.DONATOR:
            return Donate.objects.filter(donator=user)
        else:
            return Donate.objects.filter(institution=Institution.objects.filter(owner=user)[0])

    def get_serializer_class(self):
        if self.action == 'update':
            return DonateUpdateSerializer
        return DonateSerializer
    
    def perform_create(self, serializer):
        donator = self.request.user
        serializer.save(donator=donator)