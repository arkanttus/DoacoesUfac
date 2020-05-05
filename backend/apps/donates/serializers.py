from rest_framework import serializers, validators, exceptions
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from .models import Donate
from apps.need_donate.models import NeedDonate
from apps.base.models import Institution
from apps.base.api.serializers import InstitutionReadSerializer
from apps.need_donate.serializers import NeedDonateSerializer
from apps.users.api.serializers import UserReadSerializer

User = get_user_model()


class InstitutionDonateSerializer(serializers.ModelSerializer):
    needDonates = NeedDonateSerializer(many=True, read_only=True)
    donator = UserReadSerializer(read_only=True)
    setNeedDonates = serializers.PrimaryKeyRelatedField(
        source='need_donate', write_only=True, queryset=NeedDonate.objects.all(),
        required=True, many=True
    )
    setDonator = serializers.PrimaryKeyRelatedField(
        source='donator', write_only=True, queryset=User.objects.all(), required=True
    )

    class Meta:
        model = Donate
        fields = (
            'id', 'needDonates', 'donator', 'setNeedDonates', 'setDonator', 'donated'
        )

class UserDonateSerializer(serializers.ModelSerializer):
    institution = InstitutionReadSerializer(read_only=True)

    class Meta:
        model = Donate
        fields = ( 'id', 'need_donate', 'institution', 'created_at', 'donated')






