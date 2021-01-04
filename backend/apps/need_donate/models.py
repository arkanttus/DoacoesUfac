from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _

from apps.base.models import Institution
from apps.base.models import BaseModel

User = get_user_model()


class TypeDonate(BaseModel):
    name = models.CharField(_('Tipo de Doação'), max_length=255)
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


class NeedDonate(BaseModel):
    description = models.CharField(_('Descrição'), max_length=255, blank=True)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='need_donates', verbose_name=_('Criador do pedido de doação')
    )
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, related_name='need_donates')
    type_donate = models.ForeignKey(TypeDonate, on_delete=models.CASCADE, related_name='need_donates')
    is_active = models.BooleanField(
        _('Ativo'), default=True, help_text=_('Desative para que esse pedido de doação não seja retornado.'),
    )

    class Meta:
        verbose_name = _('Doação Necessitada')
        verbose_name_plural = _('Doações Necessitadas')

    def __str__(self):
        return f'{self.institution.name} {self.type_donate.name}'


