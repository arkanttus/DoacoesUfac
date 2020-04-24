import uuid
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, name,  password, **extra_fields):
        """
        Create and save a user with the given email and password.
        """
        if not email:
            raise ValueError('Um email precisa ser fornecido')
        if not name:
            raise ValueError('Um nome precisa ser fornecido')
        email = self.my_normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email=None, name=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, name, password, **extra_fields)

    def create_superuser(self, email, name, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, name, password, **extra_fields)

    def my_normalize_email(self, email):
        _email = self.normalize_email(email)
        return _email.lower()


class User(AbstractBaseUser, PermissionsMixin):
    DONATOR = 'D'
    RECEIVER = 'R'
    TYPE_USER_CHOICES = (
        (DONATOR, 'Doador'),
        (RECEIVER, 'Receptor')
    )

    id = models.UUIDField('ID', default=uuid.uuid4, editable=False, primary_key=True)
    email = models.EmailField(
        _('Email'),
        unique=True,
        error_messages={
            'unique': _("Já existe um usuário com este email"),
        },
    )
    name = models.CharField(_('Nome'), max_length=255)
    is_staff = models.BooleanField(
        _('Membro da Equipe'),
        default=False,
        help_text=_('Terá acesso ao Django Admin'),
    )
    is_active = models.BooleanField(
        _('Ativo'),
        default=True,
        help_text=_(
            'Desative para tirar o acesso do usuário'
        ),
    )
    last_login = models.DateTimeField(_('Último Login'), blank=True, null=True)
    date_joined = models.DateTimeField(_('Criação da Conta'), default=timezone.now)
    email_confirm = models.BooleanField(_('Email Confirmado'), default=False)
    share_email = models.BooleanField(_('Compartilhar Email'), default=False)
    share_phone = models.BooleanField(_('Compartilhar Telefone'), default=False)
    phone_number = models.CharField(_('Número de Telefone'), max_length=20)
    type_user = models.CharField(_('Tipo de Usuario'), max_length=1, choices=TYPE_USER_CHOICES, null=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'phone_number']

    class Meta:
        verbose_name = _('Usuário')
        verbose_name_plural = _('Usuários')

    def __str__(self):
        return f'{self.name} {self.phone_number}'

    @property
    def get_short_name(self):
        return self.name[:30]
