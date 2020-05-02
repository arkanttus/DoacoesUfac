from rest_framework import serializers, validators, exceptions
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from localflavor.br.validators import BRCPFValidator
import re
from django.contrib.auth.forms import SetPasswordForm
from django.conf import settings


# Get the UserModel
UserModel = get_user_model()


class UserReadSerializer(serializers.ModelSerializer):
    email = serializers.ReadOnlyField()
    cpf = serializers.ReadOnlyField()
    name = serializers.ReadOnlyField()
    staffUser = serializers.BooleanField(source='is_staff', read_only=True)
    isActive = serializers.BooleanField(source='is_active', read_only=True)
    superUser = serializers.BooleanField(source='is_superuser', read_only=True)
    dateJoined = serializers.BooleanField(source='date_joined', read_only=True)
    emailConfirm = serializers.BooleanField(source='email_confirm', read_only=True)
    shareEmail = serializers.BooleanField(source='share_email', read_only=True)
    sharePhone = serializers.BooleanField(source='share_phone', read_only=True)
    phoneNumber = serializers.CharField(source='phone_number', read_only=True)
    typeUser = serializers.CharField(source='get_type_user_display', read_only=True)

    class Meta:
        model = UserModel
        fields = (
            'id', 'email', 'cpf', 'name', 'staffUser', 'isActive', 'superUser', 'dateJoined', 'emailConfirm',
            'shareEmail', 'sharePhone', 'phoneNumber', 'typeUser'
        )


class UserCreateSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True, error_messages={'required': _('Campo Obrigatório')},
        validators=[validators.UniqueValidator(queryset=UserModel.objects.all())]
    )
    name = serializers.CharField(required=True, error_messages={'required': _('Campo Obrigatório')})
    cpf = serializers.CharField(
        required=False, validators=[
            BRCPFValidator(), validators.UniqueValidator(queryset=UserModel.objects.all())
        ]
    )
    emailConfirm = serializers.BooleanField(source='email_confirm', default=False)
    shareEmail = serializers.BooleanField(source='share_email', required=False, default=False)
    sharePhone = serializers.BooleanField(source='share_phone', required=False, default=False)
    phoneNumber = serializers.CharField(
        source='phone_number', required=True, error_messages={'required': _('Campo Obrigatório')}
    )
    password1 = serializers.CharField(
        source='password', label=_("Password"), write_only=True, error_messages={'required': _('Campo Obrigatório')},
        style={'input_type': 'password'}, trim_whitespace=False
    )
    typeUser = serializers.ChoiceField(
        source='type_user', required=True, error_messages={'required': _('Campo Obrigatório')},
        choices=UserModel.TYPE_USER_CHOICES
    )

    class Meta:
        model = UserModel
        fields = (
            'email', 'name', 'cpf', 'emailConfirm', 'shareEmail', 'sharePhone', 'phoneNumber', 'password1', 'typeUser'
        )

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = UserModel.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            user = super(UserCreateSerializer, self).update(instance, validated_data)
            user.set_password(password)
            return user
        else:
            return super(UserCreateSerializer, self).update(instance, validated_data)

    def validate_phoneNumber(self, value):
        number = re.sub(r'\D', '', value)
        if len(number) > 11 or len(number) < 11:
            raise exceptions.ValidationError(_('Número Inválido'))
        return number


class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(max_length=128)
    new_password1 = serializers.CharField(max_length=128)
    new_password2 = serializers.CharField(max_length=128)

    set_password_form_class = SetPasswordForm

    def __init__(self, *args, **kwargs):
        self.old_password_field_enabled = getattr(
            settings, 'OLD_PASSWORD_FIELD_ENABLED', False
        )
        super(PasswordChangeSerializer, self).__init__(*args, **kwargs)

        if not self.old_password_field_enabled:
            self.fields.pop('old_password')

        self.request = self.context.get('request')
        self.user = getattr(self.request, 'user', None)

    def validate_old_password(self, value):
        invalid_password_conditions = (
            self.old_password_field_enabled,
            self.user,
            not self.user.check_password(value)
        )

        if all(invalid_password_conditions):
            raise serializers.ValidationError('Senha invalida')
        return value

    def validate(self, attrs):
        self.set_password_form = self.set_password_form_class(
            user=self.user, data=attrs
        )

        if not self.set_password_form.is_valid():
            raise serializers.ValidationError(self.set_password_form.errors)
        return attrs

    def save(self):
        self.set_password_form.save()



