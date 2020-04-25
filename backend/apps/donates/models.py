import uuid
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from localflavor.br.validators import BRCPFValidator

User = get_user_model()

class Donate(models.Model):
    id = models.UUIDField('ID', default=uuid.uuid4, editable=False, primary_key=True)
    name = models.CharField(_('Nome'), max_length=255)
    description = models.CharField(_('Descrição'), max_length=255)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, 
        related_name='owner', 
        verbose_name=_('Criador da doação')
    )
    #intitute = models.ForeignKey(Institute, on_delete=models.CASCADE, related_name='donates')
    type_donate = models.ForeignKey(TypeDonate, on_delete=models.CASCADE, related_name='donates')
    is_active = models.BooleanField(
        _('Ativo'),
        default=True,
        help_text=_(
            'Desative para que essa doação não seja retornada.'
        ),
    )
    created_at = models.DateTimeField(_('Criação da Doação'), auto_now=True)
    updated_at = models.DateTimeField(_('Última atualização'), auto_now=True)  
    

    class Meta:
        verbose_name = _('Doação')
        verbose_name_plural = _('Doações')

    def __str__(self):
        return f'{self.name} {self.type_donate.name}'

    @property
    def get_short_name(self):
        return self.name[:30]

class TypeDonate(models.Model):
    FOOD = 'F'
    HYGIENE = 'H'
    MONEY = 'M'
    CLOTHES = 'C'
    REMEDY = 'R'
    OTHER = 'O'

    TYPE_DONATE_CHOICES = (
        (FOOD, 'Alimento'),
        (HYGIENE, 'Higiene'),
        (MONEY, 'Dinheiro'),
        (CLOTHES, 'Roupa'),
        (REMEDY, 'Rémedio'),
        (OTHER, 'Outros')
    )

    id = models.UUIDField('ID', default=uuid.uuid4, editable=False, primary_key=True)
    name = models.CharField(_('Nome'), max_length=255)
    type_donate = models.CharField(_('Tipo de Doação'), max_length=1, choices=TYPE_DONATE_CHOICES, null=True)
    is_active = models.BooleanField(
        _('Ativo'),
        default=True,
        help_text=_(
            'Desative para que esse tipo de doação não seja retornado.'
        ),
    )
    created_at = models.DateTimeField(_('Criação do tipo de doação'), auto_now=True)
    updated_at = models.DateTimeField(_('Última atualização'), auto_now=True)  
    

    class Meta:
        verbose_name = _('Tipo de Doação')
        verbose_name_plural = _('Tipos de Doação')

    def __str__(self):
        return f'{self.name}'

    @property
    def get_short_name(self):
        return self.name[:30]