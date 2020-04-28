from rest_framework import serializers, validators, exceptions
from django.utils.translation import gettext_lazy as _
from .models import Donate, TypeDonate
from apps.base.api.serializers import InstitutionReadSerializer


class TypeDonateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeDonate
        fields = ('id', 'name')


class DonateSerializer(serializers.ModelSerializer):
    institution = InstitutionReadSerializer(read_only=True)
    type_donate = TypeDonateSerializer(read_only=True)
    set_type_donate = serializers.PrimaryKeyRelatedField(
        source='type_donate', write_only=True, queryset=TypeDonate.objects.all(), required=True
    )
    
    class Meta:
        model = Donate
        fields = (
            'id', 'name', 'institution', 'description', 'type_donate', 'set_type_donate'
        )






