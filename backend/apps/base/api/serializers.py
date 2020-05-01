from rest_framework import serializers
from django.contrib.auth import get_user_model
from apps.base.models import Institution, TypeInstitution
from apps.users.api.serializers import UserReadSerializer


User = get_user_model()


class TypeInstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeInstitution
        fields = ('id', 'name', 'description')


class InstitutionReadSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField()
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    typeInstitution = serializers.ReadOnlyField(source='type_institution.name', read_only=True)
    otherType = serializers.ReadOnlyField(source='other_type')
    image = serializers.ImageField(use_url=True)
    description = serializers.ReadOnlyField()
    street = serializers.ReadOnlyField()
    neighborhood = serializers.ReadOnlyField()
    number = serializers.ReadOnlyField()
    latitude = serializers.ReadOnlyField()
    longitude = serializers.ReadOnlyField()

    class Meta:
        model = Institution
        fields = (
            'id', 'name', 'owner', 'typeInstitution', 'otherType', 'image', 'description', 'street', 'neighborhood',
            'number', 'latitude', 'longitude'
        )


class InstitutionCreateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, max_length=200)
    owner = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=True)
    typeInstitution = serializers.PrimaryKeyRelatedField(
        queryset=TypeInstitution.objects.all(), required=True, source='type_institution'
    )
    otherType = serializers.ReadOnlyField(source='other_type')
    image = serializers.ImageField()
    description = serializers.CharField(required=False, max_length=500)
    street = serializers.CharField(required=True, max_length=200)
    neighborhood = serializers.CharField(required=True, max_length=155)
    number = serializers.IntegerField(required=False)
    latitude = serializers.CharField(required=False, max_length=20)
    longitude = serializers.CharField(required=False, max_length=20)

    class Meta:
        model = Institution
        fields = (
            'name', 'owner', 'typeInstitution', 'image', 'description', 'street', 'neighborhood',
            'number', 'latitude', 'longitude'
        )





