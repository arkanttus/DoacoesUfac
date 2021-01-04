from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _
from django.core.mail import send_mail

from apps.base.models import Institution
from apps.base.models import BaseModel
from apps.need_donate.models import NeedDonate

User = get_user_model()


class Donate(BaseModel):
    need_donate = models.ManyToManyField(NeedDonate, related_name='donates')
    donator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='donates')
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, related_name='donates')
    donated = models.BooleanField(
        _('Doado'), default=False, help_text=_('Verdadeiro se a instituição tiver confirmado a doação')
    )

    class Meta:
        verbose_name = _('Doação')
        verbose_name_plural = _('Doações')

    def __str__(self):
        return f'{self.institution.name} {self.donator.name}'
    
    def email_notification(self, **kwargs):
        subject = 'Navigo - Nova doação recebida'
        message = ' Olá ' + self.institution.owner.name + ', sua instituição ' + self.institution.name + ' acabou de receber uma doação. \n Acesse o Navigo para visualizá-la: \n https://doacao.ufac.br/dashboard/ \n'
        send_mail(subject, message, 'doacoesufac@gmail.com', [self.institution.owner.email], **kwargs)
        


