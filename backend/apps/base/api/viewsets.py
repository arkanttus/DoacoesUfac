from rest_framework import response, status, viewsets, views, permissions, generics
from django.utils.translation import gettext_lazy as _

from .serializers import InstitutionSerializer, TypeInstitutionSerializer
from apps.base.models import Institution, TypeInstitution

class InstitutionView(viewsets.ModelViewSet):
    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer
    #permission_classes = (permissions.IsAuthenticated,)

class TypeInstitutionView(viewsets.ModelViewSet):
    queryset = TypeInstitution.objects.all()
    serializer_class = TypeInstitutionSerializer
    #permission_classes = (permissions.IsAuthenticated,)

