from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import NeedDonate, TypeDonate
from apps.base.models import Institution

User = get_user_model()


class TypeDonateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeDonate
        fields = ('id', 'name')


class NeedDonateSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    institution = serializers.PrimaryKeyRelatedField(read_only=True)
    typeDonate = serializers.ReadOnlyField(source='type_donate.name', read_only=True)
    setOwner = serializers.PrimaryKeyRelatedField(
        source='owner', write_only=True, queryset=User.objects.all(), required=True
    )
    setInstitution = serializers.PrimaryKeyRelatedField(
        source='institution', write_only=True, queryset=Institution.objects.all(), required=True
    )
    setTypeDonate = serializers.PrimaryKeyRelatedField(
        source='type_donate', write_only=True, queryset=TypeDonate.objects.all(), required=True
    )
    
    class Meta:
        model = NeedDonate
        fields = (
            'id', 'description', 'owner', 'institution', 'typeDonate', 'setOwner',
            'setInstitution', 'setTypeDonate'
        )

