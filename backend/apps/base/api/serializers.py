from rest_framework import serializers
from django.contrib.auth import get_user_model
from apps.base.models import Institution, TypeInstitution
from apps.users.api.serializers import UserCreateSerializer


User = get_user_model()


class TypeInstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeInstitution
        fields = ('id', 'name')


class InstitutionReadSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField()
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    typeInstitution = serializers.ReadOnlyField(source='type_institution.name', read_only=True)
    otherType = serializers.ReadOnlyField(source='other_type')
    image = serializers.ImageField(use_url=True)
    description = serializers.ReadOnlyField()
    latitude = serializers.ReadOnlyField()
    longitude = serializers.ReadOnlyField()
    uf = serializers.ReadOnlyField()
    city = serializers.ReadOnlyField()
    linkTwitter = serializers.ReadOnlyField(source='link_twitter')
    linkInstagram = serializers.ReadOnlyField(source='link_instagram')
    linkFacebook = serializers.ReadOnlyField(source='link_facebook')

    class Meta:
        model = Institution
        fields = (
            'id', 'name', 'owner', 'typeInstitution', 'otherType', 'image', 'description','latitude', 'longitude',
            'linkTwitter', 'linkInstagram', 'linkFacebook', 'uf', 'city'
        )


class InstitutionCreateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, max_length=200)
    owner = UserCreateSerializer(required=True)
    typeInstitution = serializers.PrimaryKeyRelatedField(
        queryset=TypeInstitution.objects.all(), required=True, source='type_institution'
    )
    otherType = serializers.CharField(source='other_type', required=False)
    image = serializers.ImageField(required=False)
    description = serializers.CharField(required=False, max_length=500)
    latitude = serializers.CharField(required=False, max_length=20)
    longitude = serializers.CharField(required=False, max_length=20)
    uf = serializers.CharField(required=True, max_length=100)
    city = serializers.CharField(required=True, max_length=100)
    linkTwitter = serializers.CharField(source='link_twitter', required=False, max_length=200)
    linkInstagram = serializers.CharField(source='link_instagram', required=False, max_length=200)
    linkFacebook = serializers.CharField(source='link_facebook', required=False, max_length=200)

    class Meta:
        model = Institution
        fields = (
            'name', 'owner', 'typeInstitution', 'image', 'description', 'latitude', 'longitude', 'otherType',
            'linkTwitter', 'linkInstagram', 'linkFacebook', 'uf', 'city'
        )

    def create(self, validated_data):
        user_data = validated_data.pop('owner')
        user = User.objects.create(**user_data)
        return Institution.objects.create(owner=user, **validated_data)

    def validate(self, attrs):
        user = attrs.get('owner', None)
        type_user = user.get('type_user', None)
        cpf = user.get('cpf', None)
        if type_user == User.RECEIVER and not cpf:
            raise serializers.ValidationError(detail='CPF para Instituição é obrigatório')
        return super(InstitutionCreateSerializer, self).validate(attrs)


class InstitutionUpdateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, max_length=200)
    owner = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    typeInstitution = serializers.PrimaryKeyRelatedField(
        queryset=TypeInstitution.objects.all(), required=True, source='type_institution'
    )
    otherType = serializers.CharField(source='other_type')
    image = serializers.ImageField(required=False)
    description = serializers.CharField(required=False, max_length=500)
    latitude = serializers.CharField(required=False, max_length=20)
    longitude = serializers.CharField(required=False, max_length=20)
    uf = serializers.CharField(required=True, max_length=100)
    city = serializers.CharField(required=True, max_length=100)
    linkTwitter = serializers.CharField(source='link_twitter', required=False, max_length=200)
    linkInstagram = serializers.CharField(source='link_instagram', required=False, max_length=200)
    linkFacebook = serializers.CharField(source='link_facebook', required=False, max_length=200)

    class Meta:
        model = Institution
        fields = (
            'name', 'owner', 'typeInstitution', 'image', 'description', 'latitude', 'longitude', 'otherType',
            'linkTwitter', 'linkInstagram', 'linkFacebook', 'uf', 'city'
        )

    def update(self, instance, validated_data):
        user_data = validated_data.pop('owner')
        return super(InstitutionUpdateSerializer, self).update(instance, validated_data)
