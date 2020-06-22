from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.mail import send_mail

from apps.base.models import Institution, TypeInstitution, Contact
from apps.users.api.serializers import UserCreateSerializer, UserReadSerializer
from apps.need_donate.serializers import NeedDonateSerializer
from apps.need_donate.models import TypeDonate, NeedDonate
import re

User = get_user_model()

pattern = r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+'


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
    countDonates = serializers.SerializerMethodField()
    otherType = serializers.ReadOnlyField(source='other_type')

    class Meta:
        model = Institution
        fields = (
            'id', 'name', 'owner', 'typeInstitution', 'image', 'description', 'latitude', 'longitude',
            'linkTwitter', 'linkInstagram', 'linkFacebook', 'uf', 'city', 'needDonates', 'otherType',
            'countDonates'
        )

    def get_needDonates(self, instance):
        need_donates = instance.need_donates.filter(is_active=True)
        return NeedDonateSerializer(need_donates, many=True).data

    def get_countDonates(self, instance):
        return instance.donates.filter(donated=True).count()


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
    setDescriptions = serializers.ListField(
        child=serializers.CharField(allow_blank=True), write_only=True
    )
    setTypeDonates = serializers.PrimaryKeyRelatedField(
        write_only=True, queryset=TypeDonate.objects.all(), required=True, many=True
    )

    class Meta:
        model = Institution
        fields = (
            'name', 'owner', 'typeInstitution', 'image', 'description', 'latitude', 'longitude', 'otherType',
            'linkTwitter', 'linkInstagram', 'linkFacebook', 'uf', 'city', 'setTypeDonates', 'setDescriptions'
        )

    def create(self, validated_data):
        user_data = validated_data.pop('owner')
        password_user = user_data.pop('password', None)

        user = User(**user_data)
        user.set_password(password_user)
        if user.type_user == User.RECEIVER:
            user.is_active = False
        user.save()

        type_donates = validated_data.pop('setTypeDonates')
        descriptions = validated_data.pop('setDescriptions')

        institution = Institution.objects.create(owner=user, **validated_data)

        need_donates = [
            NeedDonate(description=desc, type_donate=t_d, owner=user, institution=institution)
            for desc, t_d in zip(descriptions, type_donates, )
        ]
        NeedDonate.objects.bulk_create(need_donates)

        return institution

    def validate(self, attrs):
        user = attrs.get('owner', None)
        type_user = user.get('type_user', None)
        cpf = user.get('cpf', None)
        if type_user == User.RECEIVER and not cpf:
            raise serializers.ValidationError(detail='CPF para Instituição é obrigatório')
        return super(InstitutionCreateSerializer, self).validate(attrs)

    def validate_linkFacebook(self, value):
        if value:
            link = re.findall(pattern, value)
            valid_link = link[0] if link else ''
            if 'facebook.com' not in valid_link:
                raise serializers.ValidationError({
                    'linkFacebook': "Digite um link válido ex: https://www.facebook.com/MinhaInstituicao/"
                })
        return value

    def validate_linkInstagram(self, value):
        if value:
            link = re.findall(pattern, value)
            valid_link = link[0] if link else ''
            if 'instagram.com' not in valid_link:
                raise serializers.ValidationError({
                    'linkInstagram': "Digite um link válido ex: https://www.instagram.com/MinhaInstituicao/"
                })
        return value

    def validate_linkTwitter(self, value):
        if value:
            link = re.findall(pattern, value)
            valid_link = link[0] if link else ''
            if 'twitter.com' not in valid_link:
                raise serializers.ValidationError({
                    'linkTwitter': "Digite um link válido ex: https://twitter.com/MinhaInstituicao/"
                })
        return value


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

    def validate_linkFacebook(self, value):
        if value:
            link = re.findall(pattern, value)
            valid_link = link[0] if link else ''
            if 'facebook.com' not in valid_link:
                raise serializers.ValidationError({
                    'linkFacebook': "Digite um link válido ex: https://www.facebook.com/MinhaInstituicao/"
                })
        return value

    def validate_linkInstagram(self, value):
        if value:
            link = re.findall(pattern, value)
            valid_link = link[0] if link else ''
            if 'instagram.com' not in valid_link:
                raise serializers.ValidationError({
                    'linkInstagram': "Digite um link válido ex: https://www.instagram.com/MinhaInstituicao/"
                })
        return value

    def validate_linkTwitter(self, value):
        if value:
            link = re.findall(pattern, value)
            valid_link = link[0] if link else ''
            if 'twitter.com' not in valid_link:
                raise serializers.ValidationError({
                    'linkTwitter': "Digite um link válido ex: https://twitter.com/MinhaInstituicao/"
                })
        return value


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = (
            'name', 'email', 'subject', 'message'
        )

    def save(self, **kwargs):
        instance = super(ContactSerializer, self).save(**kwargs)
        subject = f'{instance.name} entrou em contato'
        message = f'Assunto: {instance.subject}\nMensagem: {instance.message}'
        send_mail(subject, message, 'doacoesufac@gmail.com', ['doacoesufac@gmail.com'], **kwargs)

