from rest_framework import viewsets, permissions, response
from rest_framework.decorators import action

from .serializers import InstitutionReadSerializer, TypeInstitutionSerializer
from apps.base.models import Institution, TypeInstitution
from apps.donates.models import Donate
from apps.donates.serializers import DonateSerializer
from apps.need_donate.models import NeedDonate
from apps.need_donate.serializers import NeedDonateSerializer


class InstitutionView(viewsets.ModelViewSet):
    queryset = Institution.objects.all()
    serializer_class = InstitutionReadSerializer
    permission_classes = (permissions.AllowAny,)

    @action(methods=['get'], detail=True)
    def donates(self, request, pk=None):
        queryset = Donate.objects.filter(institution_id=pk)
        serializer = DonateSerializer(queryset, many=True)
        return response.Response(serializer.data)

    @action(methods=['get'], detail=True)
    def need_donates(self, request, pk=None):
        queryset = NeedDonate.objects.filter(institution_id=pk)
        serializer = NeedDonateSerializer(queryset, many=True)
        return response.Response(serializer.data)


class TypeInstitutionView(viewsets.ModelViewSet):
    queryset = TypeInstitution.objects.all()
    serializer_class = TypeInstitutionSerializer
    permission_classes = (permissions.AllowAny,)

