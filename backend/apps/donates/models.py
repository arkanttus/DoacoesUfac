from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _

from apps.base.models import Institution
from apps.base.models import BaseModel

User = get_user_model()


class TypeDonate(BaseModel):
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

    type_donate = models.CharField(_('Tipo de Doação'), max_length=1, choices=TYPE_DONATE_CHOICES, null=True)
    is_active = models.BooleanField(
        _('Ativo'), default=True, help_text=_('Desative para que esse tipo de doação não seja retornado.')
    )

    class Meta:
        verbose_name = _('Tipo de Doação')
        verbose_name_plural = _('Tipos de Doação')

    def __str__(self):
        return f'{self.name}'

    @property
    def get_short_name(self):
        return self.name[:30]


class Donate(BaseModel):
    name = models.CharField(_('Nome'), max_length=255)
    description = models.CharField(_('Descrição'), max_length=255)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='owner', verbose_name=_('Criador da doação')
    )
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, related_name='donates')
    type_donate = models.ForeignKey(TypeDonate, on_delete=models.CASCADE, related_name='donates')
    is_active = models.BooleanField(
        _('Ativo'), default=True, help_text=_('Desative para que essa doação não seja retornada.'),
    )

    class Meta:
        verbose_name = _('Doação')
        verbose_name_plural = _('Doações')

    def __str__(self):
        return f'{self.name} {self.type_donate.name}'

    @property
    def get_short_name(self):
        return self.name[:30]

