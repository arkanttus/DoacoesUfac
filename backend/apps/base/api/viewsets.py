from rest_framework import viewsets, permissions

from .serializers import InstitutionReadSerializer, TypeInstitutionSerializer
from apps.base.models import Institution, TypeInstitution


class InstitutionView(viewsets.ModelViewSet):
    queryset = Institution.objects.all()
    serializer_class = InstitutionReadSerializer
    permission_classes = (permissions.AllowAny,)


class TypeInstitutionView(viewsets.ModelViewSet):
    queryset = TypeInstitution.objects.all()
    serializer_class = TypeInstitutionSerializer
    permission_classes = (permissions.AllowAny,)

