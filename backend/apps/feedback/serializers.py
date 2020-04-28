from rest_framework import serializers

from .models import Feedback
from apps.users.api.serializers import UserReadSerializer
from apps.users.models import User
from apps.donates.serializers import DonateSerializer, TypeDonateSerializer
from apps.donates.models import Donate, TypeDonate
from apps.base.api.serializers import InstitutionReadSerializer


class FeedbackSerializer(serializers.ModelSerializer):
    user = UserReadSerializer(read_only=True)
    institution = InstitutionReadSerializer(read_only=True)
    donate = DonateSerializer(read_only=True)
    type_donate = TypeDonateSerializer(read_only=True)
    set_user = serializers.PrimaryKeyRelatedField(
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
            'id', 'name', 'description', 'user', 'institution', 'donate', 'type_donate', 'set_user',
            'set_donate', 'set_type_donate'
        )
