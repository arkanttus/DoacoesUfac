from rest_framework import serializers
from django.contrib.auth import get_user_model
from apps.base.models import Institution, TypeInstitution
from apps.users.api.serializers import UserCreateSerializer, UserReadSerializer
from apps.need_donate.serializers import NeedDonateSerializer


User = get_user_model()


class TypeInstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeInstitution
        fields = ('id', 'name')


class InstitutionReadSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField()
    owner = UserReadSerializer(read_only=True)
    typeInstitution = serializers.ReadOnlyField(source='type_institution.name', read_only=True)
    image = serializers.ImageField(use_url=True)
    description = serializers.ReadOnlyField()
    latitude = serializers.ReadOnlyField()
    longitude = serializers.ReadOnlyField()
    uf = serializers.ReadOnlyField()
    city = serializers.ReadOnlyField()
    linkTwitter = serializers.ReadOnlyField(source='link_twitter')
    linkInstagram = serializers.ReadOnlyField(source='link_instagram')
    linkFacebook = serializers.ReadOnlyField(source='link_facebook')
    needDonates = serializers.SerializerMethodField()
    otherType = serializers.ReadOnlyField(source='other_type')

    class Meta:
        model = Institution
        fields = (
            'id', 'name', 'owner', 'typeInstitution', 'image', 'description', 'latitude', 'longitude',
            'linkTwitter', 'linkInstagram', 'linkFacebook', 'uf', 'city', 'needDonates', 'otherType'
        )

    def get_needDonates(self, instance):
        need_donates = instance.need_donates.filter(is_active=True)
        return NeedDonateSerializer(need_donates, many=True).data


class InstitutionCreateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, max_length=200)
    owner = UserCreateSerializer(required=True)
    typeInstitution = serializers.PrimaryKeyRelatedField(
        queryset=TypeInstitution.objects.all(), required=True, source='type_institution'
    )
    otherType = serializers.CharField(source='other_type', required=False, allow_null=True)
    image = serializers.ImageField(required=False)
    description = serializers.CharField(required=False, max_length=500)
    latitude = serializers.CharField(required=False, max_length=20)
    longitude = serializers.CharField(required=False, max_length=20)
    uf = serializers.CharField(required=True, max_length=100)
    city = serializers.CharField(required=True, max_length=100)
    linkTwitter = serializers.CharField(
        source='link_twitter', required=False, max_length=200, allow_null=True, allow_blank=True
    )
    linkInstagram = serializers.CharField(
        source='link_instagram', required=False, max_length=200, allow_null=True, allow_blank=True
    )
    linkFacebook = serializers.CharField(
        source='link_facebook', required=False, max_length=200, allow_null=True, allow_blank=True
    )

    class Meta:
        model = Institution
        fields = (
            'name', 'owner', 'typeInstitution', 'image', 'description', 'latitude', 'longitude', 'otherType',
            'linkTwitter', 'linkInstagram', 'linkFacebook', 'uf', 'city'
        )

    def create(self, validated_data):
        user_data = validated_data.pop('owner')
        password_user = user_data.pop('password', None)

        user = User.objects.create(**user_data)
        user.set_password(password_user)
        if user.type_user == User.RECEIVER:
            user.is_active = False
        user.save()
        return Institution.objects.create(owner=user, **validated_data)

    def validate(self, attrs):
        user = attrs.get('owner', None)
        type_user = user.get('type_user', None)
        cpf = user.get('cpf', None)
        if type_user == User.RECEIVER and not cpf:
            raise serializers.ValidationError(detail='CPF para Instituição é obrigatório')
        return super(InstitutionCreateSerializer, self).validate(attrs)

    def validate_linkFacebook(self):
        if self.linkFacebook not in ['https://facebook.com', 'http://facebook.com', 'facebook.com']:
            raise serializers.ValidationError({'linkFacebook': "Digite um link do facebook"})

    def validate_linkInstagram(self):
        if self.linkInstagram not in ['https://instagram.com', 'http://instagram.com', 'instagram.com']:
            raise serializers.ValidationError({'linkInstagram': "Digite um link do instagram"})

    def validate_linkTwitter(self):
        if self.linkTwitter not in ['https://twitter.com', 'http://twitter.com', 'twitter.com']:
            raise serializers.ValidationError({'linkTwitter': "Digite um link do twitter"})


class InstitutionUpdateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, max_length=200)
    owner = serializers.PrimaryKeyRelatedField(required=True, queryset=User.objects.all())
    typeInstitution = serializers.PrimaryKeyRelatedField(
        queryset=TypeInstitution.objects.all(), required=True, source='type_institution'
    )
    otherType = serializers.CharField(source='other_type', required=False, allow_null=True)
    image = serializers.ImageField(required=False)
    description = serializers.CharField(required=False, max_length=500)
    latitude = serializers.CharField(required=False, max_length=20)
    longitude = serializers.CharField(required=False, max_length=20)
    uf = serializers.CharField(required=True, max_length=100)
    city = serializers.CharField(required=True, max_length=100)
    linkTwitter = serializers.CharField(
        source='link_twitter', required=False, max_length=200, allow_null=True, allow_blank=True
    )
    linkInstagram = serializers.CharField(
        source='link_instagram', required=False, max_length=200, allow_null=True, allow_blank=True
    )
    linkFacebook = serializers.CharField(
        source='link_facebook', required=False, max_length=200, allow_null=True, allow_blank=True
    )

    class Meta:
        model = Institution
        fields = (
            'name', 'owner', 'typeInstitution', 'image', 'description', 'latitude', 'longitude', 'otherType',
            'linkTwitter', 'linkInstagram', 'linkFacebook', 'uf', 'city'
        )

    def validate_linkFacebook(self):
        if self.linkFacebook not in ['https://facebook.com', 'http://facebook.com', 'facebook.com']:
            raise serializers.ValidationError({'linkFacebook': "Digite um link do facebook"})

    def validate_linkInstagram(self):
        if self.linkInstagram not in ['https://instagram.com', 'http://instagram.com', 'instagram.com']:
            raise serializers.ValidationError({'linkInstagram': "Digite um link do instagram"})

    def validate_linkTwitter(self):
        if self.linkTwitter not in ['https://twitter.com', 'http://twitter.com', 'twitter.com']:
            raise serializers.ValidationError({'linkTwitter': "Digite um link do twitter"})


