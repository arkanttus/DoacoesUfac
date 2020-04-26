from rest_framework import serializers, validators, exceptions
from django.utils.translation import gettext_lazy as _
from apps.base.models import Institution, TypeInstitution
from apps.users.api.serializers import UserReadSerializer


class TypeInstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeInstitution
        fields = ('id','name', 'description')


class InstitutionSerializer(serializers.ModelSerializer):
    owner = UserReadSerializer(read_only=True)
    type_institution = TypeInstitutionSerializer(read_only=True)
    image = serializers.ImageField(required=True, use_url=True)
    set_type_institution= serializers.PrimaryKeyRelatedField(
        source='type_institution', write_only=True, queryset=TypeInstitution.objects.all(), required=True
    )
    
    class Meta:
        model = Institution
        fields = (
            'id', 'name', 'owner', 'type_institution', 'other_type', 'description', 
            'image', 'set_type_donate', 'street', 'neighborhood', 'number', 
            'latitude', 'longitude'
        )






