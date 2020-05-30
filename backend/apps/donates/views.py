
from rest_framework import viewsets, permissions, response, status

from .serializers import DonateSerializer, DonateUpdateSerializer
from .models import Donate
from .permissions import *
from .utils import validate_recaptcha

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
            return Donate.objects.filter(institution=Institution.objects.filter(owner=user).first()).order_by('donated')

    def get_serializer_class(self):
        if self.action == 'update':
            return DonateUpdateSerializer
        return DonateSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = DonateSerializer(data=request.data, context=self.get_serializer_context())
        serializer.is_valid(raise_exception=True)

        try:
            print(request.data)
            recaptcha_response = request.data.get('g-recaptcha-response')
            print(recaptcha_response)
            if validate_recaptcha(recaptcha_response):
                self.perform_create(serializer)
            else:
                return response.Response({'errors': 'Recaptcha inválido'}, status=status.HTTP_401_UNAUTHORIZED)

        except Institution.DoesNotExist:
            return response.Response({'errors': 'Recaptcha inválido'}, status=status.HTTP_401_UNAUTHORIZED)
            
        headers = self.get_success_headers(serializer.data)
        return response.Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        donator = self.request.user
        serializer.save(donator=donator)

