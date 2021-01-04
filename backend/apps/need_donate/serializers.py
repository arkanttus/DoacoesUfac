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
    description = serializers.CharField(read_only=True)
    typeDonate = TypeDonateSerializer(source='type_donate', read_only=True)
    setDescriptions = serializers.ListField(child=serializers.CharField(allow_blank=True), source='description', 
        write_only=True
    )
    setTypeDonates = serializers.PrimaryKeyRelatedField(
        source='type_donate', write_only=True, queryset=TypeDonate.objects.all(), 
        required=True, many=True
    )
    
    class Meta:
        model = NeedDonate
        fields = (
            'id', 'description', 'typeDonate', 'setDescriptions', 'setTypeDonates', 'owner', 
            'institution'
        )
    
    def create(self, validated_data):
        type_donates = validated_data.pop('type_donate')
        descriptions = validated_data.pop('description')
        need_donates = [NeedDonate(description=desc, type_donate=t_d, **validated_data) 
                        for desc, t_d in zip(descriptions, type_donates, )
        ]
        return NeedDonate.objects.bulk_create(need_donates)

