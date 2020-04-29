from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _

from apps.base.models import Institution
from apps.base.models import BaseModel
from apps.need_donate.models import NeedDonate

User = get_user_model()

class Donate(BaseModel):
    need_donate = models.ForeignKey(NeedDonate, on_delete=models.CASCADE, related_name='donates')
    donator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='donates')
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, related_name='donates')
    donated = models.BooleanField(_('Doado'), default=False, 
        help_text=_('Verdadeiro se a instituição tiver confirmado a doação')
    )

    class Meta:
        verbose_name = _('Doação')
        verbose_name_plural = _('Doações')

    def __str__(self):
        return f'{self.institution.name} {self.donator.name}'

