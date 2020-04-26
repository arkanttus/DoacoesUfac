import uuid
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from localflavor.br.validators import BRCPFValidator

from apps.donates.models import Donate, TypeDonate
from apps.base.models import Institution

User = get_user_model()

class Feedback(models.Model):
    id = models.UUIDField('ID', default=uuid.uuid4, editable=False, primary_key=True)
    name = models.CharField(_('Nome'), max_length=255)
    description = models.CharField(_('Descrição'), max_length=255)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, related_name='feedbacks')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='feedbacks')
    donate = models.ForeignKey(Donate, on_delete=models.CASCADE, related_name='feedbacks', null=True)
    type_donate = models.ForeignKey(TypeDonate, on_delete=models.CASCADE, related_name='feedbacks')
    is_active = models.BooleanField(
        _('Ativo'),
        default=True,
        help_text=_(
            'Desative para que esse feedback não seja retornado.'
        ),
    )
    created_at = models.DateTimeField(_('Criação do Feedback'), auto_now=True)
    updated_at = models.DateTimeField(_('Última atualização'), auto_now=True)  
    

    class Meta:
        verbose_name = _('Feedback')
        verbose_name_plural = _('Feedbacks')

    def __str__(self):
        return f'{self.name} {self.user.name}'

    @property
    def get_short_name(self):
        return self.name[:30]

