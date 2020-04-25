from rest_framework import serializers, validators, exceptions
from django.utils.translation import gettext_lazy as _

from .models import Feedback
from users.api.serializers import UserReadSerializer
from users.models import User
from donates.serializers import DonateSerializer, TypeDonateSerializer
from donates.models import Donate, TypeDonate

class FeedbackSerializer(serializers.ModelSerializer):
    user = UserReadSerializer(read_only=True)
    donate = DonateSerializer(read_only=True)
    type_donate = TypeDonateSerializer(read_only=True)
    set_user= serializers.PrimaryKeyRelatedField(
        source='user', write_only=True, queryset=User.objects.all(), required=True
    )
    set_donate = serializers.PrimaryKeyRelatedField(
        source='donate', write_only=True, queryset=Donate.objects.all(), required=True
    )
    set_type_donate = serializers.PrimaryKeyRelatedField(
        source='type_donate', write_only=True, queryset=TypeDonate.objects.all(), required=True
    )
    
    class Meta:
        model = Feedback
        fields = (
            'id', 'name', 'description', 'user', 'donate', 'type_donate', 'set_user',
            'set_donate', 'set_type_donate'
        )

