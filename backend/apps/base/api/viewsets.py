from rest_framework import viewsets, permissions, response, status

from .serializers import (
    InstitutionReadSerializer, TypeInstitutionSerializer, InstitutionCreateSerializer, InstitutionUpdateSerializer
)
from apps.base.models import Institution, TypeInstitution


class InstitutionView(viewsets.ModelViewSet):
    queryset = Institution.objects.all()
    permission_classes = (permissions.AllowAny,)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return InstitutionReadSerializer
        return InstitutionUpdateSerializer

    def create(self, request, *args, **kwargs):
        serializer = InstitutionCreateSerializer(data=request.data, context=self.get_serializer_context())
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        try:
            qs = Institution.objects.get(id=serializer.instance.id)
            serializer_read = InstitutionReadSerializer(qs, context={'request': request})
        except Institution.DoesNotExist:
            return response.Response({'errors': 'Instituição não encontrada'}, status=status.HTTP_404_NOT_FOUND)
        headers = self.get_success_headers(serializer_read.data)
        return response.Response(serializer_read.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}
        try:
            qs = Institution.objects.get(id=serializer.instance.id)
            serializer_read = InstitutionReadSerializer(qs, context={'request': request})
        except Institution.DoesNotExist:
            return response.Response({'errors': 'Instituição não encontrada'}, status=status.HTTP_404_NOT_FOUND)
        return response.Response(serializer_read.data)


class TypeInstitutionView(viewsets.ReadOnlyModelViewSet):
    queryset = TypeInstitution.objects.all()
    serializer_class = TypeInstitutionSerializer
    permission_classes = (permissions.AllowAny,)

