import os
import uuid
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.utils import timezone

User = get_user_model()


class BaseModel(models.Model):
    id = models.UUIDField('ID', default=uuid.uuid4, editable=False, primary_key=True)
    created_at = models.DateTimeField(_('Criado em'), auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(_('Última atualização'), editable=False)

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        if self.created_at:
            self.updated_at = timezone.now()
        return super(BaseModel, self).save(*args, **kwargs)


class TypeInstitution(BaseModel):
    name = models.CharField(_('Nome'), max_length=100, unique=True)

    class Meta:
        verbose_name = _('Tipo de Instituição')
        verbose_name_plural = _('Tipos de Instituição')

    def __str__(self):
        return f'{self.name}'


def path_image_institution(instance, filename):
    extension = os.path.splitext(filename)[-1]
    return f'institution/{instance.nome}_{instance.type_institution.name}{extension}'


class Institution(BaseModel):
    # Info
    name = models.CharField(_('Instituição'), max_length=200)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name=_('Responsável pela Instituição'))
    type_institution = models.ForeignKey(
        TypeInstitution, on_delete=models.PROTECT, verbose_name=_('Tipo de Instituição')
    )
    other_type = models.CharField(_('Outro tipo'), max_length=100, null=True, blank=True)
    description = models.TextField(_('Descrição da Instituição'), max_length=500)
    image = models.ImageField(_('Foto da instituição'), upload_to=path_image_institution)

    # Address
    street = models.CharField(_('Rua'), max_length=200)
    neighborhood = models.CharField(_('Bairro'), max_length=155)
    number = models.IntegerField(_('Número'), null=True, blank=True)

    # Geo
    latitude = models.CharField(_('Latitude'), max_length=20, null=True, blank=True)
    longitude = models.CharField(_('Latitude'), max_length=20, null=True, blank=True)

    class Meta:
        verbose_name = _('Instituição')
        verbose_name_plural = _('Instituições')

    def __str__(self):
        return f'{self.name} - Owner: {self.owner.name}'

    def clean(self):
        if self.type_institution.name.startswith('Outro') and not self.other_type:
            raise ValidationError(_('Especifique o tipo de instituição'))
